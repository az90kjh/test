export default {
  async fetch(request, env, ctx) {
    const html = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>송현_의 방송국 | SOOP</title>
        <style>
          /* 1. 기본 설정 (다크 테마) */
          :root {
            --bg-color: #111111;
            --nav-bg: #1a1a1a;
            --card-bg: #222222;
            --text-main: #ffffff;
            --text-sub: #a0a0a0;
            --point-color: #0058ff; /* SOOP 블루 컬러 포인트 */
          }
          
          body {
            margin: 0;
            font-family: 'Pretendard', -apple-system, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden; /* 전체 화면 스크롤 방지 */
          }

          /* 2. 상단 네비게이션 메뉴 (탭) */
          nav {
            background-color: var(--nav-bg);
            padding: 20px 0;
            display: flex;
            justify-content: center;
            gap: 30px;
            border-bottom: 1px solid #333;
            z-index: 10;
          }
          nav button {
            background: none;
            border: none;
            color: var(--text-sub);
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.3s;
            padding: 5px 10px;
          }
          nav button:hover { color: var(--text-main); }
          nav button.active {
            color: var(--point-color);
            border-bottom: 2px solid var(--point-color);
          }

          /* 3. 메인 콘텐츠 영역 (내용이 길면 여기서 스크롤) */
          .container {
            flex: 1;
            overflow-y: auto;
            padding: 40px 20px 100px 20px; /* 아래 플레이어 공간 확보 */
          }
          
          /* 탭에 따라 보이고 숨겨지는 섹션 설정 */
          section {
            display: none;
            max-width: 800px;
            margin: 0 auto;
            animation: fadeIn 0.4s ease;
          }
          section.active { display: block; }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* 4. 프로필 화면 디자인 */
          .profile-header {
            background-color: var(--card-bg);
            border-radius: 20px;
            padding: 40px;
            display: flex;
            gap: 30px;
            align-items: center;
            flex-wrap: wrap;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .profile-image {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background-image: url('https://profile.img.afreecatv.com/LOGO/so/songhy/songhy.jpg');
            background-size: cover;
            background-position: center;
            border: 4px solid #333;
          }
          .profile-info h1 { margin: 0 0 10px 0; font-size: 32px; font-weight: 900; }
          .profile-info p { color: var(--text-sub); line-height: 1.6; margin-bottom: 20px; }
          
          .btn-group { display: flex; gap: 10px; }
          .btn {
            padding: 10px 20px;
            background: #333;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            transition: 0.2s;
          }
          .btn.soop { background: var(--point-color); }
          .btn:hover { filter: brightness(1.2); }

          /* 5. 노래책 & 일정표 공통 디자인 (표 스타일) */
          .content-box { margin-top: 40px; }
          .content-box h2 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          
          .data-table {
            width: 100%;
            border-collapse: collapse;
          }
          .data-table th, .data-table td {
            text-align: left;
            padding: 15px;
            border-bottom: 1px solid #333;
          }
          .data-table th { color: var(--text-sub); font-size: 14px; font-weight: normal; }
          .data-table tr:hover { background-color: rgba(255,255,255,0.05); }

          /* 6. 하단 고정 뮤직 플레이어 */
          .player-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--nav-bg);
            border-top: 1px solid #333;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            z-index: 20;
          }
          .player-left { display: flex; align-items: center; gap: 15px; }
          .cd-icon {
            width: 45px;
            height: 45px;
            background: linear-gradient(45deg, #ff007a, #0058ff);
            border-radius: 50%;
            animation: spin 4s linear infinite;
          }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          
          .player-info h4 { margin: 0; font-size: 14px; color: var(--text-main); }
          .player-info p { margin: 5px 0 0 0; font-size: 12px; color: var(--text-sub); }
          .player-right { color: var(--point-color); font-size: 24px; font-weight: bold; }

        </style>
      </head>
      <body>

        <!-- 메뉴(탭) 영역 -->
        <nav>
          <button class="tab-btn active" onclick="changeTab('tab-profile', this)">PROFILE</button>
          <button class="tab-btn" onclick="changeTab('tab-schedule', this)">SCHEDULE</button>
          <button class="tab-btn" onclick="changeTab('tab-songbook', this)">SONG BOOK</button>
        </nav>

        <!-- 전체 콘텐츠 영역 -->
        <div class="container">
          
          <!-- 1. 프로필 탭 -->
          <section id="tab-profile" class="active">
            <div class="profile-header">
              <div class="profile-image"></div>
              <div class="profile-info">
                <h1>송현_</h1>
                <p>안녕하세요! SOOP 스트리머 송현_입니다.<br>항상 찾아와 주시고 응원해 주셔서 감사합니다 💙</p>
                <div class="btn-group">
                  <a href="https://www.sooplive.com/station/songhy" target="_blank" class="btn soop">SOOP 방송국 ↗</a>
                  <a href="https://www.youtube.com/@songhy___/featured" target="_blank" class="btn">유튜브 채널 ↗</a>
                </div>
              </div>
            </div>

            <div class="content-box">
              <h2>ABOUT</h2>
              <table class="data-table">
                <tr><th>방송 시간</th><td>매일 저녁 8시 (휴방 시 공지 참조)</td></tr>
                <tr><th>특이 사항</th><td>게임 중 훈수 금지, 타 스트리머 언급 자제 부탁드려요!</td></tr>
              </table>
            </div>
          </section>

          <!-- 2. 일정 탭 -->
          <section id="tab-schedule">
            <div class="content-box">
              <h2>이번 주 방송 일정</h2>
              <p style="color: var(--text-sub); margin-bottom: 20px;">일정은 변동될 수 있으며, 자세한 내용은 방송국 공지를 확인해 주세요.</p>
              <table class="data-table">
                <tr><th>요일</th><th>시간</th><th>콘텐츠</th></tr>
                <tr><td>월요일</td><td>오후 8:00</td><td>종합 게임 (스팀)</td></tr>
                <tr><td>수요일</td><td>오후 8:00</td><td>저챗 & 시청자 소통</td></tr>
                <tr><td>금요일</td><td>오후 9:00</td><td>시청자 참여 콘텐츠</td></tr>
                <tr><td>주말</td><td>랜덤</td><td>게릴라 방송</td></tr>
              </table>
            </div>
          </section>

          <!-- 3. 노래책 탭 -->
          <section id="tab-songbook">
            <div class="content-box">
              <h2>SONG BOOK ♫</h2>
              <p style="color: var(--text-sub); margin-bottom: 20px;">방송 중 신청 가능한 노래 목록입니다.</p>
              <table class="data-table">
                <tr><th>가수</th><th>노래 제목</th><th>상태</th></tr>
                <tr><td>윤하 (Younha)</td><td>사건의 지평선</td><td>완료</td></tr>
                <tr><td>아이유 (IU)</td><td>밤편지</td><td>완료</td></tr>
                <tr><td>뉴진스 (NewJeans)</td><td>Ditto</td><td>연습 중</td></tr>
                <tr><td>요아소비 (YOASOBI)</td><td>아이돌 (Idol)</td><td>연습 중</td></tr>
              </table>
            </div>
          </section>

        </div>

        <!-- 하단 플레이어 영역 -->
        <div class="player-bar">
          <div class="player-left">
            <div class="cd-icon"></div>
            <div class="player-info">
              <h4>NOW PLAYING</h4>
              <p>송현_ BGM 플레이어 (현재 준비 중)</p>
            </div>
          </div>
          <div class="player-right">♫</div>
        </div>

        <!-- 자바스크립트 (탭 변경 기능) -->
        <script>
          function changeTab(tabId, clickedBtn) {
            // 1. 모든 섹션 숨기기
            const sections = document.querySelectorAll('section');
            sections.forEach(sec => sec.classList.remove('active'));
            
            // 2. 모든 버튼에서 색상(활성화) 빼기
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // 3. 클릭한 탭 보여주고, 클릭한 버튼 색상 칠하기
            document.getElementById(tabId).classList.add('active');
            clickedBtn.classList.add('active');
          }
        </script>

      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
