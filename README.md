# 🏠 부동산 실거래가 비교 사이트

> 공공데이터 포탈의 아파트 상세 거래 내역 API를 이용한 아파트 거래내역을 확인 사이트

- 페이지 URL: [https://realestateproject.vercel.app/](https://realestateproject.vercel.app/)
- API 설명:

## 목차

1. [제작 기간](#제작기간)
2. [사용 기술](#사용기술)
3. [기능](#기능)
4. [트러블 슈팅 및 해결 방법](#트러블슈팅)
5. [어려웠던 점](#어려웠던점)
6. [추가 예정 기능](#추가예정기능)
7. [프로젝트 참고 사이트](#프로젝트참고사이트)

## <div id="제작기간">1.제작기간</div>

- 제작 기간: 2023.05.06~
- 추가 개발 중.
- 개인 프로젝트

## <div id="사용기술">2.사용기술</div>

### `프론트앤드`

- React
- React-Router
- tailwindCSS
- React-Query
- React-icon
- React-Spinner

### `백앤드`

- nodeJS
- NestJS
- MySQL
- TypeORM

### `Deploy`

- AWS-RDS
- heroku(nestJS)
- vercel(React)

## <div id="기능">3.기능</div>

### 1.검색

- 아파트명을 통한 검색과 시도를 이용한 검색을 이용하여 아파트를 검색.

### 2.아파트 목록

- 모바일 화면에서는 무한 스크롤, PC브라우저에서는 페이징 기법을 이용하여 아파트목록을 검색했다.

### 3.아파트 거래 상세 내역

- 아파트에 대한 간략한 정보와 최근까지 거래된 아파트 거래 내역을 검색할수 있게 처리.

## <div id="트러블 슈팅">4.트러블 슈팅 및 해결 방법</div>

1. CORS

   - 현재 프로젝트가 백앤드와 프론트앤드가 분리가 되어있어서 프론트에서 아파트 및 거래내역 목록을 불러올 때 CORS 이슈가 발생.
   - 검색 해본 결과 아래와 3가지의 해결 방안이 있었음
     1. `package.json` 파일에서 `proxy` 프로퍼티를 추가하고 해당 도메인 입력(⭕️->❌)
        - 로컬에서만 가능하고, 배포시 서버에서 다시 설정 해야하는 단점이 있음.
        - 서버 반영전에는 해당 방법으로 일단 이슈 해결 후 3번째 방법으로 해결.
     2. `http-proxy-middleware` 라이브러리 이용(❌)
        - 1번 경우와 똑같은 단점.
        - 상세한 설정이 가능하지만, 해당 프로젝트에서는 그럴 필요까진 없다는 판단아래 사용하지 않음.
     3. 백앤드 서버에서 직접 설정 ⭕️
        - 현업에서 일할 때 해당 이슈는 서버단에서 해결했던 경험이 있었고, 이번 사이드 프로젝트는 간단한 백엔드까지 구현하여, 해당 방법을 이용.
        - NestJS에 CORS 설정을 간단하게 할수 있어서, [해당 블로그](https://velog.io/@suasue/NestJS-CORS-%EC%84%A4%EC%A0%95) 를 참고하여 설정.

   > 참고 https://velog.io/@yunsungyang-omc/React-React-App%EC%97%90%EC%84%9C-CORS-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0

2. 무한 스크롤

   - 아파트 목록 페이지에서 검색결과 목록을 불러올때, 무한 스크롤을 이용한 추가목록을 불러오는 작업을 하려고했음.
   - 전체적인 기능은 이상없이 잘 되었으나, 흔히들 말하는 맨 아래까지 갔을때의 스크롤 이벤트를 호출하려는 의도와는 다르게, 3/4정도 갔을때 이벤트가 실행되는 문제점이 있었음.
     > 참고 https://velog.io/@hoje15v/JS-clientHeight-offsetHeight-scrollHeight-%EC%9D%98-%EC%B0%A8%EC%9D%B4

3. 법정동 코드 목록 캐싱 처리.

   - 법정동 데이터는 거의 변하지않는 데이터라, 검색 방법을 변경하거나 이전에 검색했던 법정동 API를 계속 불러오는것이 효율에 맞지않는거 같아 어려 방법을 통해서 개선을 해보려했다.
     1. `localStorage`(❌)
        - 사용자가 페이지를 최초로 들어왔을때만 법정동 조회 API를 호출하고 그 결과를 스토리지에 넣고, 이후에는 스토리지에서 조회하는 방법을 조회했다.
        - 백엔드 API를 빈번하게 호출하지않는것 에는 만족한 개발방법이었으나 모든 법정동 데이터들을 스토리지에 넣기에는 무거울 수 있겠다는 생각이 들었다._(브라우저별로 차이가 있겠지만, 스토리지는 최대 5MB까지 허용하는것으로 알고있음.)_
     2. `reactQuery` 적용(⭕️)
        - 최소 페이지 진입시, 시도 데이터는 API를 통해불러오고, `staleTime` 옵션을 이용해, 페이지가 리랜더링될때, 캐싱한 데이터를 불러올 수 있게 처리하였다.
        - 시군구 데이터는 시도 코드가 변경시 시도 코드마다 쿼리 키를 따로 두어, 같은시도를 여러번 변경해도 1번만 API를 조회할수 있게 처리하였다.

4. 앞&뒤로가기시 history URL에 맞는 header설정과 아파트검색이 되지않음.

   - 헤더에서 지역 또는 아파트명 검색 시 검색어에 맞는 맞는 아파트 목록을 출력하게 만들었다. `reactRouter` navigate를 이용해 지역코드 또는 아파트명을 `navigate` `state`에 값을 실어서 페이지가 이동하게 처리.
   - 페이지 이동 후 검색에 맞는 데이터 랜더링에는 문제가 없으나, 앞&뒤로가기 시 queryString에 맞게 검색이 되지 않았다.

     - 최초 개발시에 검색모드 값을 담당하는 `searchMode` 상태값을 선언하면서 바로 초기화를 해주었다. `search.indexOf("keyword") > -1 ? "keywordSearch" : "codeSearch"` 값과 초기화된 `searchMode` 상태값을 검색모드를 다르게하여 검색을 한 후 잎&뒤로가기를 했을 때의 콘솔 값을 출력시 서로 다르게 나왔다.
     - 그래서, `useEffect`에서 상태값을 다시 세팅을 하니, URL에 맞는 header 설정과 아파트 검색이 의도대로 나올수가 있었다.
     - **왜 해결이 되었는지는 포스팅과 이전에 들었던 강의를 통해서 다시 공부한후에 블로그에 포스팅을 해볼예정.**

     ```javascript
     //Before
     const [searchMode, setSearchMode] = useState(
       search.indexOf("keyword") > -1 ? "keywordSearch" : "codeSearch"
     );
     ```

     ```javascript
     //After
     useEffect(() => {
       setSearchMode(
         search.indexOf("keyword") > -1 ? "keywordSearch" : "codeSearch"
       );
     }, [search]);
     ```

## <div id="어려웠던점">5.어려웠던 점</div>

1. heroku,vercel 배포

   - 처음해보는 무료 클라우드 배포 서버라 걱정이 많았지만, 하는 방법이 블로그에 많이 있어서, 어렵지 않게 할수 있었다.

2. AWS RDB서버 추가.
   - AWS설정때문에 과금이 되었다는 이야기를 들어 걱정이 되었으나, 인스턴스 설정과 RDS MySQL 생성까지 직접 해보니, 크게 어려운건 없었다.(참고링크:https://dev-elena-k.tistory.com/category/AWS%20%EC%9D%B4%EC%9A%A9%20%EA%B8%B0%EB%A1%9D%20%EB%82%A8%EA%B8%B0%EA%B8%B0)

## <div id="추가예정기능">5.추가 예정 기능</div>

1. PC 버전 구현
   - 기능이 추가적으로 구현되는 즉시 PC버전으로 볼수 있는 페이지 개발 예정.
2. 전체적인 거래 차트 조회 기능 추가
   - 아파트 최신거래 일자 순으로 보여주는 테이블 외에 이를 차트로 한눈에 볼 수 있는 컴포넌트 추가 개발예정.
3. 선택된 아파트의 전월세 거래 데이터 추가.

## <div id="프로젝트참고사이트">6.프로젝트 참고 사이트 및 앱</div>

- 네이버 부동산 모바일 앱
- 호갱노노
- [위세브:전국 아파트 매매 실거래가 정보](https://weseb.com/SJB/board.php?board=apartment)
