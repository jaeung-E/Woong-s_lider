(function () {

    // 사용할 요소
    const contentWrap = document.querySelector('.content_wrap');
    const content = document.querySelectorAll('.content');
    const pageBox = document.querySelector('.page_box');
    const sliderWindow = document.querySelector('.slider_window');
    const btn = document.querySelectorAll('.btn');
    const pageBtn = document.querySelectorAll('.page_btn');
    const nextBtn = document.querySelector('.next_btn');
    const prevBtn = document.querySelector('.prev_btn');

    // 각 요소 위치 및 기본값 초기화
    const contentLength = content.length;
    const pageLength = pageBtn.length;
    let index = 1;
    let pageWidth = 20;
    let contentWidth = sliderWindow.offsetWidth;
    
    content.forEach(c => c.style.width = `${contentWidth}px`);
    btn.forEach(b => b.style.top = `${sliderWindow.offsetHeight / 2 - 15}px`);
    
    contentWrap.style.width = `${contentWidth * contentLength}px`;
    pageBox.style.top = `${sliderWindow.offsetHeight - 30}px`;
    nextBtn.style.left = `${contentWidth - 30}px`
    contentWrap.style.transform = `translateX(${-contentWidth}px)`;
    pageBox.style.width = `${pageWidth * pageLength + 10}px`;
    prevBtn.style.left = `0px`;

    // 리사이즈 이벤트
    (function() {
        window.addEventListener('resize', function() {
            contentWidth = sliderWindow.offsetWidth;

            content.forEach(c => c.style.width = `${contentWidth}px`);
            btn.forEach(b => b.style.top = `${sliderWindow.offsetHeight / 2 - 15}px`);

            contentWrap.style.width = `${contentWidth * contentLength}px`;
            pageBox.style.top = `${sliderWindow.offsetHeight - 30}px`;
            nextBtn.style.left = `${contentWidth - 30}px`
            contentWrap.style.transition = null;
            contentWrap.style.transform = `translateX(${-index * contentWidth}px)`;
        });
    })();

    // 마우스 오버 및 버튼 이벤트
    (function () {
        pageBtn[0].classList.add('current');
        let intervalId = undefined;
        intervalId = setInterval(moveNext, 2500);

        sliderWindow.addEventListener('mouseover', function () {
            for (const b of btn) {
                b.classList.add('hover');
            }

            // mouse를 .slide_window 위에 올리면 자동 슬라이드 종료
            clearInterval(intervalId);
        });

        sliderWindow.addEventListener('mouseout', function () {
            for (const b of btn) {
                b.classList.remove('hover');
            }

            // mouse가 .slide_window를 벗어나면 자동 슬라이드
            intervalId = setInterval(moveNext, 2500);
        });

        for (const gBtn of pageBtn) {
            gBtn.addEventListener('mouseover', function () {
                gBtn.classList.add('hover');
            });

            gBtn.addEventListener('mouseout', function () {
                gBtn.classList.remove('hover');
            });

            gBtn.addEventListener('click', movePage);
        }

        nextBtn.addEventListener('click', moveNext);
        prevBtn.addEventListener('click', movePrev);
    })();

    // 다음 이미지로 이동(슬라이드를 좌측으로 이동)
    function moveNext() {
        pageBtn[index - 1].classList.remove('current');

        contentWrap.style.transition = 'transform 1s';
        contentWrap.style.transform = `translateX(${-(++index) * contentWidth}px)`;
        delayBtnEvent();

        if (index > 5) {
            index = 1;
            initSlider();
        }

        pageBtn[index - 1].classList.add('current');
    }

    // 이전 이미지로 이동(슬라이드를 우측으로 이동)
    function movePrev() {
        pageBtn[index - 1].classList.remove('current');

        contentWrap.style.transition = 'transform 1s';
        contentWrap.style.transform = `translateX(${-(--index) * contentWidth}px)`;
        delayBtnEvent();

        if (index < 1) {
            index = 5;
            initSlider();
        }

        pageBtn[index - 1].classList.add('current');
    }

    // index가 컨텐츠 범위를 벗어날 경우, 슬라이드의 위치를 초기화
    function initSlider() {
        setTimeout(function () {
            contentWrap.style.transition = 'transform 0s';
            contentWrap.style.transform = `translateX(${-(index) * contentWidth}px)`;
        }, 1000);
    }

    // 버튼 이벤트의 중복발생을 막기 위한 이벤트 지연
    function delayBtnEvent() {
        prevBtn.removeEventListener('click', movePrev);
        nextBtn.removeEventListener('click', moveNext);

        for (const gBtn of pageBtn) {
            gBtn.removeEventListener('click', movePage);
        }

        setTimeout(function () {
            nextBtn.addEventListener('click', moveNext);
            prevBtn.addEventListener('click', movePrev);

            for (const gBtn of pageBtn) {
                gBtn.addEventListener('click', movePage);
            }
        }, 1000);
    }

    // 버튼을 클릭해서 원하는 이미지로 이동
    function movePage() {
        pageBtn[index - 1].classList.remove('current');

        index = this.getAttribute('id');
        contentWrap.style.transition = 'transform 1s';
        contentWrap.style.transform = `translateX(${-(index) * contentWidth}px)`;

        pageBtn[index - 1].classList.add('current');
    }
})();