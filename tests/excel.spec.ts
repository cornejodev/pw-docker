import { expect, test } from '@playwright/test';
import { createPerson, deletePerson, getAllPeople, updatePerson } from '../utils/execelUtils';

test('Excel CRUD Operations', async ({ }) => {
    // CREATE
    createPerson({ name: 'Alice', age: 28 });
    createPerson({ name: 'Bob', age: 32 });

    // READ
    let people = getAllPeople();
    console.log('People after create:', people);
    expect(people.length).toBeGreaterThan(0);

    // UPDATE
    updatePerson('Alice', { age: 29 });
    people = getAllPeople();
    const alice = people.find(p => p.name === 'Alice');
    expect(alice?.age).toBe(29);

    // DELETE
    deletePerson('Bob');
    people = getAllPeople();
    const bob = people.find(p => p.name === 'Bob');
    expect(bob).toBeUndefined();
});
