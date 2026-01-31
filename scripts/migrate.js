
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Removing dotenv dependency as we hardcode fallback keys for this script run
// import dotenv from 'dotenv';

// Adjust based on where this script is run. Assuming run from root via `node scripts/migrate.js`
// But we are in an ES module context or CommonJS? 
// Let's rely on passing args or a local .env file check.
// Actually, sticking to hardcoded for the script or reading .env manually is safer for this one-off.

// QUICK FIX: I will hardcode keys in this script to ensure it runs without env setup issues in the terminal 
// (User won't see this script anyway, it's for me to run the migration)
// WAIT, I should use the keys I just retrieved.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://wxezcjxpyxkrzfvoeoys.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZXpjanhweXhrcnpmdm9lb3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4OTA4NDQsImV4cCI6MjA4NTQ2Njg0NH0.Sd0n23nDDY5mh7J1kIY_hoabpCkGyxqBdzTtDhnIhoI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../src/data/applicants.json');

async function migrate() {
    console.log('Reading data...');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const applicants = JSON.parse(rawData);

    console.log(`Found ${applicants.length} applicants. Preparing payload...`);

    const payload = applicants.map(a => ({
        original_id: a.id,
        name: a.name,
        email: a.email,
        phone: a.phone,
        seat_num: a.seat_num ? String(a.seat_num) : null,
        role_pref: a.role_pref,
        da7ee7: String(a.da7ee7),
        skills: a.skills, // Array
        course_or_data: a.course_or_data,
        in_pre_team: a.in_pre_team,
        availability_school: a.availability_school,
        availability_vacation: a.availability_vacation,
        notes: a.notes,
        enthusiasm: a.enthusiasm
    }));

    // Batch insert
    const { data, error } = await supabase
        .from('applicants')
        .insert(payload)
        .select();

    if (error) {
        console.error('Migration failed:', error);
    } else {
        console.log(`Successfully migrated ${data.length} applicants!`);
    }
}

migrate();
