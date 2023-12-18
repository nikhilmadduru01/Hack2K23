export interface MCQQuestion {
    id: number;
    questionText: string;
    options: MCQQuestionOption[];
    answer: string;
    correctOption: string;
    isSubmitted?: boolean;
}

export interface MCQQuestionOption {
    optionId: string;
    optionValue: string;
}

export interface UserResponse {
    questionId?: number;
    selectedOptionId: number;
}