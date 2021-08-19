import http from "../../http-common";

class QuestionDataService{

    create(id,data){
        return http.post(`/question/create/${id}`,data);
    }
    updateQuestion(id,data){
        return http.put(`/question/updateQuestion/${id}`,data);
    }
}
export default new QuestionDataService();