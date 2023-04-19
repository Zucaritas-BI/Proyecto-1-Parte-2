export class Search {
    id: number;
    searched_at: string;
    sentiment: string;

    constructor(id: number, searched_at: string, sentiment: string) {
        this.id = id;
        this.searched_at = searched_at;
        this.sentiment = sentiment;
    }
}