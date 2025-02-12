const baseUrl = import.meta.env.VITE_BACKEND;

export const getTrainings = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${baseUrl}/training`, {
        headers: { "authorization": `Bearer ${token}` }, // ponemos en headers el token generado
    });
    const trainings = await response.json();
    return trainings;
};

export const getTrainingId = async (id) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${baseUrl}/training/${id}`, {
        headers: { "authorization": `Bearer ${token}` }, // ponemos en headers el token generado
    });
    const training = await response.json();
    return training;
};

export const addTraining = async (data) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${baseUrl}/training/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const newTraining = await response.json();
    return newTraining;
};

export const updateTraining = async (id, data) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${baseUrl}/training/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    });
    const training = await response.json();
    return training;
};

export const deleteTraining = async (id) => {
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${baseUrl}/training/${id}`, {
        method: 'DELETE',
        headers: { "authorization": `Bearer ${token}` }
    })
    const deletedTraining = await response.json();
    return deletedTraining
}