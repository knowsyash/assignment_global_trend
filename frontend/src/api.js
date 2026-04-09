const BASE_URL = 'http://localhost:5000';

export async function getTasks() {
    const response = await fetch(`${BASE_URL}/tasks`);
    return response.json();
}

export async function createTask(title) {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    return response.json();
}

export async function updateTask(id, completed) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    });

    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
    });

    return response.json();
}
