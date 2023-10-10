import axios from "axios";
import { MainApi } from './ApiManager'

export const findAllBooksApi = async () => {
    try {
        const result = await MainApi(`/book`, {
            method: 'GET'
        });

        return result;
    } catch (error) {
        console.log(error);
        throw error; // Mengembalikan error jika terjadi kesalahan
    }
}

export const findOneBookApi = async () => {
    try {
        const result = await MainApi(`/book/:id`, {
            method: 'GET'
        })

        return result
    } catch (error) {
        throw error
    }
}

export const editBookApi = async () => {
    try {
        const result = await MainApi(`/book/:id`, {
            method: 'PATCH'
        })

        return result
    } catch (error) {
        throw error
    }
}

export const deleteBookApi = async (bookId) => {
    try {
        const response = await MainApi(`/book/${bookId}`, {
            method: 'DELETE'
        })

        return response.data
    } catch (error) {
        throw error
    }
}
