import { GameTotalTime } from '@enum/game.enum';
import Memory_question_test from '@models/entities/memory_questions_test';
import Test from '@models/entities/tests';

export var timeout = (test: Test): any => {
    var now_date = new Date();
    var now = now_date.getTime();
    var end_time = test.end_time.getTime();
    const t = end_time - now;

    if (t <= 0) {
        console.log(t);
        return 1;
    } else return 0;
};

export var memoryQuestionTimeout = (question: Memory_question_test, level: number): any => {
    var now_date = new Date();
    var now = now_date.getTime();
    var is_showed_at = question.is_showed_at.getTime();
    const t = now - is_showed_at;
    console.log(t);
    if (t >= level * 20000) {
        console.log(t);
        return 1;
    } else return 0;
};
