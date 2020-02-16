// 1. 동작에 대해 설계한 후, 객체를 선택하는 작업
const nav = document.querySelector('.menu')
// 3line에서 불러온 menu에서 탐색하도록 작성
const btn = nav.querySelector('.buttonBurger')
// querySelectorAll 여러개의 item을 모두 선택해주도록 작성
const items = nav.querySelectorAll('.menu__item')
const links = nav.querySelectorAll('.menu__link')

// 상태 변수
// 2. 변수를 만들고 초기값을 선언함
let mode = null
let isPristine = true
function render(){
  // window의 inner width값이 999보다 작거나 같을 때
  let isMobile = window.innerWidth <= 999
  if (mode === isMobile) {
    return
  }
  mode = isMobile
  if (isMobile) {
    // 모바일 환경의 경우....
    btn.setAttribute('aria-haspopup', 'true')

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      item.classList.remove('icon-star')
      item.classList.add('icon-plus')
    }
    for (let i = 0; i < links.length; i++) {
      let link = links[i]
      link.setAttribute('role', 'button')
      link.setAttribute('aria-haspopup', 'true')
      link.setAttribute('aria-pressed', 'false')
      link.setAttribute('aria-expanded', 'false')
    }
    if (isPristine) {
      // 버튼(btn)을 클릭하면 내비게이션(nav) 요소를 찾아서
      // isAct라는 클래스를 추가하거나 제거 할 것(toggle)
      btn.addEventListener('click', function (e) {
        if (nav.classList.contains('menu--isAct')) {
          btn.setAttribute('aria-label', '메뉴 닫기')
          btn.setAttribute('aria-pressed', 'true')
        } else {
          btn.setAttribute('aria-label', '메뉴 열기')
          btn.setAttribute('aria-pressed', 'false')
        }
        nav.classList.toggle('menu--isAct')
      })
      // 메뉴 버튼(.menu-item)을 클릭하면
      // 클릭한 버튼의 부모 요소의 형제 요소들을 찾아 menu-act라는 클래스를 삭제한다.
      // 클릭한 버튼의 부모 요소인 .menu-list에 menu-act라는 클래스를 추가한다.
      for (let i = 0; i < links.length; i++) {
        let link = items[i]
        link.addEventListener('click', function (e) {
          e.preventDefault()

          let _this = e.target
          let _parent = _this.parentNode

          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            item.classList.remove('menu__item--isAct')
            item.classList.remove('icon-minus')
            item.classList.add('icon-plus')
          }

          for (var i = 0; i < links.length; i++) {
            var link = links[i]
            link.setAttribute('aria-pressed', 'false')
            link.setAttribute('aria-expanded', 'false')
          }

          _this.parentNode.classList.add('menu__item--isAct')
          _this.setAttribute('aria-pressed', 'true')
          _this.setAttribute('aria-expanded', 'true')

          if (_parent.classList.contains('menu__item--isAct')) {
            _parent.classList.remove('icon-plus')
            _parent.classList.add('icon-minus')
          }
        })
      }
      // 초기 실행 후, 오염 상태로 변경
      isPristine = !isPristine
    }
  }
  else {
    //데스크탑 환경의 경우
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      item.classList.remove('icon-plus')
      item.classList.remove('icon-minus')
    }
    for (let i = 0; i < links.length; i++) {
      let link = links[i]
      link.setAttribute('role', 'presentation')
      // 포커스를 받을 필요가 없기 때문에 tabindex="-1" 로 만들어주는 코드가 필요하다
      link.setAttribute('tabindex', '-1')
    }
  }
}

// 이벤트 연결 [로드, 리사이즈]
window.addEventListener('load', render)
window.addEventListener('resize', render)

