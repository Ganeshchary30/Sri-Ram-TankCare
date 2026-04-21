const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Database Path ─────────────────────────────────────────────────────────────
const DB_PATH = path.join(__dirname, 'contacts.db');

// ─── Initialize SQL.js and Load / Create Database ─────────────────────────────
let db;

async function initDatabase() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    // Load existing database from disk
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
    console.log('✅ Loaded existing database from:', DB_PATH);
  } else {
    // Create a new empty database
    db = new SQL.Database();
    console.log('✅ Created new database at:', DB_PATH);
  }

  // Create table if it doesn't already exist
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      phone      TEXT,
      query      TEXT    NOT NULL,
      created_at TEXT    NOT NULL
    )
  `);

  // Save the initial structure to disk
  saveDatabase();
}

/** Saves the in-memory database to the .db file on disk */
function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

/** Returns current local datetime as a readable string */
function getLocalDateTime() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

// ─── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /api/contact
 * Saves a new contact form submission to the database.
 * Body: { name, email, phone, query }
 */
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    if (!name || !email || !query) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and query are required.'
      });
    }

    const now = getLocalDateTime();

    db.run(
      `INSERT INTO contacts (name, email, phone, query, created_at) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone || '', query, now]
    );

    // Persist to disk after every insert
    saveDatabase();

    console.log(`📥 New submission saved | Name: ${name} | Email: ${email} | Time: ${now}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

/**
 * GET /api/export
 * Downloads all contact submissions as a CSV file (opens in Excel).
 * Visit: http://localhost:3001/api/export
 */
app.get('/api/export', (req, res) => {
  try {
    const result = db.exec('SELECT * FROM contacts ORDER BY id DESC');

    let csvContent = 'ID,Name,Email,Phone,Query,Submitted At\n';

    if (result.length > 0) {
      const rows = result[0].values;
      const escape = (val) => `"${String(val || '').replace(/"/g, '""')}"`;

      csvContent += rows.map(row =>
        [row[0], escape(row[1]), escape(row[2]), escape(row[3]), escape(row[4]), escape(row[5])].join(',')
      ).join('\n');

      console.log(`📤 Exported ${rows.length} contact(s) as CSV`);
    } else {
      console.log('📤 No contacts to export yet.');
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');
    res.send(csvContent);

  } catch (error) {
    console.error('❌ Error exporting contacts:', error);
    res.status(500).send('Server error during export.');
  }
});

/**
 * GET /api/contacts
 * Returns all contacts as JSON (useful for viewing in browser).
 */
app.get('/api/contacts', (req, res) => {
  try {
    const result = db.exec('SELECT * FROM contacts ORDER BY id DESC');

    if (result.length === 0) {
      return res.json({ success: true, count: 0, data: [] });
    }

    const cols = result[0].columns;
    const rows = result[0].values.map(row => {
      const obj = {};
      cols.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });

    res.json({ success: true, count: rows.length, data: rows });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── Health Check ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Sri Ram TankCare Contact API is live!',
    endpoints: {
      submit: 'POST /api/contact         → save form submission',
      export: 'GET  /api/export          → download CSV (open in Excel)',
      view:   'GET  /api/contacts        → view all submissions as JSON'
    }
  });
});

// ─── Start Server ───────────────────────────────────────────────────────────────
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Export CSV  : http://localhost:${PORT}/api/export`);
    console.log(`👁  View data  : http://localhost:${PORT}/api/contacts\n`);
  });
}).catch(err => {
  console.error('❌ Failed to initialize database:', err);
  process.exit(1);
});
