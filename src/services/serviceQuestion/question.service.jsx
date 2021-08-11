import http from "../../http-common";

class QuestionDataService{

    create(id,data){
        return http.post(`/question/create/${id}`,data);
    }
}
export default new QuestionDataService();