
interface ProductScoreMetrics {
    average: {
        _id: string;
        score: string;
        total_reviews: number;
    };
    scoreMetrics: Score[];
}
