class PartApi {
    static getPartCategories() {
        return fetch('http://localhost:8888/part-categories').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default PartApi;