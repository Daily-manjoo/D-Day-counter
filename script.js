const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date"); //가져올 키

const intervalIdArr = [];

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate; //날짜 담길 변수
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //가독성 더 좋게

  return dateFormat; //함수 밖으로 꺼내주기(밑에 counterMake에서 사용되기 위해)
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMake = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data); //키, 밸류형식
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0); //문자열 참조,setHours은 자정 기준으로
  const remaining = (targetDate - nowDate) / 1000; //D-day까지 몇 초 남았는지, 1초는 1000밀리초다.
  if (remaining <= 0) {
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    container.style.display = "none";
    messageContainer.style.display = "flex";
    setClearInterval(); //타이머 종료돼야 할 조건
    return; //조건 해당하면 함수 종료
  } else if (isNaN(remaining)) {
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    container.style.display = "none";
    messageContainer.style.display = "flex";
    setClearInterval(); //타이머 종료돼야 할 조건
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24), //60분 = 3600초 , 남은 날 , 소수점 내리기(math.floor)
    remainingHours: Math.floor(remaining / 3600) % 24, //302시간을 24시간 기준으로 나눔
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);
  // ['remainingDate', 'remainingHours'...]

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = function (targetDateInput) {
  //매개변수로 들어온 경우 재할당 가능(바깥쪽에서도 참조 가능)
  if (!targetDateInput) {
    //들어온 값이 없을 경우
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMake(targetDateInput); //counterMake 함수 한번 실행해주지 않으면 아랫줄에서 1초 뒤에 실행하기 때문
  const intervalId = setInterval(() => {
    counterMake(targetDateInput);
  }, 1000); //함수실행하면 한번밖에 실행 안돼서 화살표 함수 넣어줌
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

if (savedDate) {
  //truthy인 경우
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요.</h3>";
}
