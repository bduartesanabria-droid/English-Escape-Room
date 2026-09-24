import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_DIR = process.env.DB_DIR
  ? path.resolve(process.env.DB_DIR)
  : path.resolve(process.cwd(), 'data');

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'escape_room.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// SQLite schema (adapted from the original PostgreSQL design: gen_random_uuid ->
// randomUUID() TEXT, BOOLEAN -> INTEGER 0/1, TIMESTAMP WITH TIME ZONE -> TEXT UTC).
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         TEXT PRIMARY KEY,
    full_name  TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,
    role       TEXT NOT NULL DEFAULT 'student',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS game_sessions (
    id                   TEXT PRIMARY KEY,
    user_id              TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_room_id      INTEGER NOT NULL DEFAULT 1,
    elapsed_time_seconds INTEGER NOT NULL DEFAULT 0,
    total_attempts       INTEGER NOT NULL DEFAULT 0,
    total_hints_used     INTEGER NOT NULL DEFAULT 0,
    is_completed         INTEGER NOT NULL DEFAULT 0,
    started_at           TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at         TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_game_sessions_user ON game_sessions(user_id);
`);

export interface UserRow {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface GameSessionRow {
  id: string;
  user_id: string;
  current_room_id: number;
  elapsed_time_seconds: number;
  total_attempts: number;
  total_hints_used: number;
  is_completed: number;
  started_at: string;
  completed_at: string | null;
}

export type SessionUpdate = Partial<{
  currentRoomId: number;
  elapsedTimeSeconds: number;
  totalAttempts: number;
  totalHintsUsed: number;
  isCompleted: boolean;
  completedAt: string | null;
}>;

const SESSION_COLUMNS: Record<keyof SessionUpdate, string> = {
  currentRoomId: 'current_room_id',
  elapsedTimeSeconds: 'elapsed_time_seconds',
  totalAttempts: 'total_attempts',
  totalHintsUsed: 'total_hints_used',
  isCompleted: 'is_completed',
  completedAt: 'completed_at',
};

// ---- Users ----
export function createUser(fullName: string, email: string, role = 'student'): UserRow {
  const id = randomUUID();
  db.prepare('INSERT INTO users (id, full_name, email, role) VALUES (?, ?, ?, ?)').run(
    id,
    fullName,
    email,
    role,
  );
  return getUserById(id)!;
}

export function getUserById(id: string): UserRow | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined;
}

export function getUserByEmail(email: string): UserRow | undefined {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
}

// ---- Game sessions ----
export function createSession(userId: string): GameSessionRow {
  const id = randomUUID();
  db.prepare('INSERT INTO game_sessions (id, user_id) VALUES (?, ?)').run(id, userId);
  return getSessionById(id)!;
}

export function getSessionById(id: string): GameSessionRow | undefined {
  return db.prepare('SELECT * FROM game_sessions WHERE id = ?').get(id) as GameSessionRow | undefined;
}

export function listSessionsByUser(userId: string): GameSessionRow[] {
  return db
    .prepare('SELECT * FROM game_sessions WHERE user_id = ? ORDER BY started_at DESC')
    .all(userId) as GameSessionRow[];
}

export function updateSession(id: string, patch: SessionUpdate): GameSessionRow | undefined {
  const keys = (Object.keys(patch) as (keyof SessionUpdate)[]).filter(
    (k) => patch[k] !== undefined && k in SESSION_COLUMNS,
  );
  if (keys.length === 0) return getSessionById(id);

  const sets = keys.map((k) => `${SESSION_COLUMNS[k]} = ?`).join(', ');
  const values = keys.map((k) => (patch[k] === true ? 1 : patch[k] === false ? 0 : patch[k]));
  db.prepare(`UPDATE game_sessions SET ${sets} WHERE id = ?`).run(...values, id);
  return getSessionById(id);
}

export function incrementCounter(
  sessionId: string,
  column: 'total_attempts' | 'total_hints_used',
  by = 1,
): void {
  db.prepare(`UPDATE game_sessions SET ${column} = ${column} + ? WHERE id = ?`).run(by, sessionId);
}

export function completeSession(sessionId: string): GameSessionRow | undefined {
  db.prepare(
    "UPDATE game_sessions SET is_completed = 1, completed_at = datetime('now') WHERE id = ?",
  ).run(sessionId);
  return getSessionById(sessionId);
}

export default db;