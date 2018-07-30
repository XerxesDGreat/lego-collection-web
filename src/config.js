export function getBaseUrl() {
    return 'http://localhost:3000';
}

export function getApiUrl() {
    return 'http://localhost:8000';
}

export const routes = {
    home: '/',
    modelList: '/models',
    modelDetail: '/models/:id',
    partList: '/parts',
    partDetail: '/parts/:id',
    partCategoryList: '/part-categories',
    login: '/login',
    myDashboard: '/my/dashboard',
    myPartList: '/my/parts',
    setList: '/sets',
};