const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container')

//container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';

const dateFormMaker = function(){
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate; //날짜 담길 변수
    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //가독성 더 좋게

    return dateFormat; //함수 밖으로 꺼내주기(밑에 counterMake에서 사용되기 위해)
    // console.log(inputYear, inputMonth, inputDate);
};

const counterMake = function(){
    const targetDateInput = dateFormMaker()
    const nowDate = new Date()
    const targetDate = new Date(targetDateInput).setHours(0,0,0,0); //문자열 참조,setHours은 자정 기준으로 
    const remaining = (targetDate - nowDate) / 1000 //D-day까지 몇 초 남았는지, 1000 나눠서 소수점 없애기
    if(remaining < 0 ){
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
    } else if(isNaN(remaining)) {
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600  / 24), //60분 = 3600초 , 남은 날 , 소수점 내리기(math.floor)
        remainingHours: Math.floor(remaining / 3600) % 24, //남은 날의 나머지 짜잘한 시간(나머지)
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec:  Math.floor(remaining) % 60
    };


    const documentObj = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        min: document.getElementById('min'),
        sec: document.getElementById('sec'),
    };

    const timeKeys = Object.keys(remainingObj);
    const docKeys = Object.keys(documentObj);

    /*for(let i = 0; i < timeKeys.length; i++){
        documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
    }
   */
    //documentObj.days.textContent = remainingObj.remainingDate; 위에 for문으로 대체
    //documentObj.hours.textContent = remainingObj.remainingHours;
    //documentObj.min.textContent = remainingObj.remainingMin;
    //documentObj.sec.textContent = remainingObj.remainingSec;

    let i = 0;
    for (let key in documentObj) {
        documentObj[key].textContent = remainingObj[timeKeys[i]]
        i = i++;
    }

};