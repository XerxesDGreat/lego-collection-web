class ModelApi {
    static getAllModels() {
        return fetch('http://localhost:8888/models').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default ModelApi;