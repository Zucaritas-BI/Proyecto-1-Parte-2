export class Post {
    id: number;
    body: string;
    sentiment: string;
    group_search_id: number;
    
    constructor(id: number, body: string, sentiment: string, group_search_id: number) {
        this.id = id;
        this.body = body;
        this.sentiment = sentiment;
        this.group_search_id = group_search_id;
    }
}