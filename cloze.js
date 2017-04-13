const ClozeCard = function (answer, fullText) {

    if (fullText.toLowerCase().indexOf(answer.toLowerCase()) >= 0) {
        this.answer = answer;
        this.fullText = fullText;
        this.question = fullText.replace(answer, '------');
    } else {
        console.log('Answer must be present in full-text statement')
    };
};

module.exports = ClozeCard;
