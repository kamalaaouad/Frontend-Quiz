import http from "../../http-common";

class QuizDataService{

    create(data){
        return http.post(`/quiz/create`,data);
    }

    getAll(){
        return http.get(`/quiz/getAll`);
    }
    getQuizById(id){
        return http.get(`/quiz/getQuizById/${id}`);
    }
    deleteQuizById(id){
        return http.delete(`/quiz/deleteQuiz/${id}`);
    }
    updateQuiz(id,data){
        return http.put(`/quiz/updateQuiz/${id}`,data);
    }
}
export default new QuizDataService();