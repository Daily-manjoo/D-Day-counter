const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container')
const intervalIdArr = [];

container.style.display = 'none';
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
        container.style.display = 'none'
        messageContainer.style.display = 'flex';
        return; //종료될 때 함수 종료
    } else if(isNaN(remaining)) {
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
        container.style.display = 'none'
        messageContainer.style.display = 'flex';
        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600  / 24), //60분 = 3600초 , 남은 날 , 소수점 내리기(math.floor)
        remainingHours: Math.floor(remaining / 3600) % 24, //남은 날의 나머지 짜잘한 시간(나머지)
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec:  Math.floor(remaining) % 60
    };


    

    const documentArr = ['days', 'hours', 'min', 'sec']
    const timeKeys = Object.keys(remainingObj);
    // ['remainingDate', 'remainingHours'...]

    let i = 0;
    for(let tag of documentArr){
        document.getElementById(tag).textContent = remainingObj[timeKeys[i]]
        i++;
    }
};

const starter = function(){
    container.style.display = 'flex';
    messageContainer.style.display = 'none';
    counterMake(); //counterMake 함수 한번 실행해주지 않으면 아랫줄에서 1초 뒤에 실행하기 때문
    const intervalId = setInterval(counterMake, 1000);
    intervalIdArr.push(intervalId);
    console.log(intervalIdArr);

};

const setClearInterval = function (){
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';
    messageContainer.style.display = 'flex';
    for (let i = 0; i < intervalIdArr.length; i++){
        clearInterval(intervalIdArr[i]);
    }

}