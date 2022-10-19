export default new class Utils {
    humanize(distance: number): string {
        let humanizedRes: string;

        switch (true) {
            case (distance <= 0):
                humanizedRes = "identical"
                break;
            case (distance > 0 && distance < 5):
                humanizedRes = "high similarity"
                break;
            case (distance > 5 && distance < 10):
                humanizedRes = "low similarity"
                break;
            default:
                humanizedRes = "different"
                break;
        }

        return humanizedRes;
    }

    imageToBuffer() {
        
    }
}