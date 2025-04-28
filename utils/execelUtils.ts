// excelUtils.ts
import * as fs from 'fs';
import * as XLSX from 'xlsx';

const FILE_PATH = './data/people.xlsx';

export interface Person {
    name: string;
    age: number;
}

// Load Excel to JSON
export function loadPeople(): Person[] {
    if (!fs.existsSync(FILE_PATH)) {
        savePeople([]); // Create empty if missing
    }
    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Person>(sheet);
}

// Save JSON to Excel
export function savePeople(people: Person[]): void {
    const worksheet = XLSX.utils.json_to_sheet(people);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, FILE_PATH);
}

// Create
export function createPerson(person: Person): void {
    const people = loadPeople();
    people.push(person);
    savePeople(people);
}

// Read
export function getAllPeople(): Person[] {
    return loadPeople();
}

// Update
export function updatePerson(name: string, updatedData: Partial<Person>): void {
    const people = loadPeople();
    const person = people.find(p => p.name === name);
    if (person) {
        Object.assign(person, updatedData);
        savePeople(people);
    }
}

// Delete
export function deletePerson(name: string): void {
    let people = loadPeople();
    people = people.filter(p => p.name !== name);
    savePeople(people);
}
