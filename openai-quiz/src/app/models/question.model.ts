export interface MCQQuestion {
    id?: number;
    question: string;
    options: MCQQuestionOption[];
    explanation: string;
    correctOption: string;
}

export interface MCQQuestionOption {
    optionId: string;
    optionValue: string;
}

export interface UserAnswer {
    optionId: string;
    questionId?: number;
}

export interface Quiz {
    topic: string,
    passage: string,
    questions: MCQQuestion[]
}