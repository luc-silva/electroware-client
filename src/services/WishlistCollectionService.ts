import axios from "axios";
import Service from "./Service";

class WishlistCollectionService extends Service {
    readonly baseUrl = "http://localhost:6060/api/collection/";

    public async getCollectionProducts(collectionId: string) {
        return await axios
            .get(this.baseUrl + `${collectionId}/products`)
            .then(({ data }) => {
                return data;
            });
    }

    public async createCollection(token: string, collectionData: any) {
        return await axios
            .post(this.baseUrl, collectionData, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }
    public async deleteCollection(token: string, collectionId: string) {
        return await axios
            .delete(this.baseUrl + collectionId, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }
    public async updateCollection(token: string, collectionId: string, updatedData:WishlistCollection) {
        return await axios
            .put(this.baseUrl + collectionId,updatedData, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }
}

export default new WishlistCollectionService();
