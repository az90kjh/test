export default {
  async fetch(request, env, ctx) {
    const html = `
      <!DOCTYPE html>
      <html lang="ko" data-theme="light">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Song Hyun | 스트리머 프로필</title>
        <!-- 웹 폰트 및 아이콘 불러오기 -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
        <style>
          /* ===== CSS 변수 (주황색 테마) ===== */
          :root {
            --bg-body: #f4f5f7;
            --bg-card: #ffffff;
            --bg-nav: #222222;
            --text-main: #111111;
            --text-sub: #666666;
            --border-color: #eeeeee;
            --point-color: #ff8200; 
            --bg-point-light: #fff3e6; 
            --nav-icon: #888888;
            --nav-icon-active: #ff8200; 
          }

          [data-theme="dark"] {
            --bg-body: #121212;
            --bg-card: #1e1e1e;
            --bg-nav: #2a2a2a;
            --text-main: #ffffff;
            --text-sub: #aaaaaa;
            --border-color: #333333;
            --point-color: #ff8200; 
            --bg-point-light: #3a2618; 
            --nav-icon: #aaaaaa;
            --nav-icon-active: #ff8200; 
          }

          /* ===== 기본 스타일 ===== */
          body {
            margin: 0;
            padding: 0;
            font-family: 'Pretendard', sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            transition: background-color 0.3s, color 0.3s;
            overflow-x: hidden;
          }
          
          h1, h2, h3, p { margin: 0; }
          ul { list-style: none; padding: 0; margin: 0; }
          a { text-decoration: none; color: inherit; }

          /* ===== 상단 플로팅 네비게이션 바 ===== */
          .nav-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--bg-nav);
            border-radius: 30px;
            padding: 8px 15px;
            display: flex;
            gap: 12px;
            z-index: 100;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }

          .nav-btn {
            background: none;
            border: none;
            color: var(--nav-icon);
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .nav-btn:hover { background-color: rgba(255,255,255,0.1); color: #fff; }
          .nav-btn.active { background-color: var(--bg-card); color: var(--nav-icon-active); box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .nav-btn .material-symbols-rounded { font-size: 22px; }

          /* ===== 1. 메인 홈 (전체화면) ===== */
          .fullscreen-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: url('https://via.placeholder.com/1920x1080/ff8200/ffffff?text=SONG+HYUN+MAIN+IMAGE');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: -1;
          }

          /* ===== 메인 콘텐츠 영역 ===== */
          .main-wrapper {
            max-width: 1100px;
            margin: 100px auto 40px;
            padding: 0 20px;
          }

          /* (수정됨) 섹션 외부 타이틀 (작고 왼쪽에 배치) */
          .section-header-out {
            margin-bottom: 12px;
            padding-left: 5px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .section-header-out h2 {
            font-size: 13px; /* 폰트 작게 */
            font-weight: 800;
            color: var(--text-main);
          }
          .section-header-out span {
            font-size: 11px;
            color: var(--text-sub);
          }

          .content-card {
            background-color: var(--bg-card);
            border-radius: 20px;
            padding: 40px;
            min-height: 700px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: background-color 0.3s;
          }

          .tab-section { display: none; animation: fadeIn 0.3s ease-in-out; }
          .tab-section.active { display: block; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

          /* ===== 2. 프로필 ===== */
          .profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 40px; }
          .profile-img { width: 100%; height: 350px; border-radius: 12px; background-color: #eee; object-fit: cover; }
          .profile-info h1 { font-size: 32px; margin-bottom: 5px; }
          .profile-info p.sub { color: var(--text-sub); margin-bottom: 30px; font-size: 14px; }
          .info-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
          .info-table th { text-align: left; font-size: 12px; color: var(--text-sub); padding-bottom: 5px; }
          .info-table td { font-size: 15px; font-weight: 600; padding-bottom: 20px; }
          
          .like-section h3, .about-section h3 { font-size: 16px; margin-bottom: 15px; }
          .like-icons { display: flex; gap: 20px; margin-bottom: 40px; }
          .like-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
          .like-item span.label { font-size: 13px; font-weight: 600; color: var(--text-main); }
          .like-circle { width: 55px; height: 55px; border-radius: 50%; background-color: var(--bg-point-light); display: flex; align-items: center; justify-content: center; color: var(--point-color); }
          
          .about-box { background-color: var(--bg-point-light); border-radius: 12px; padding: 25px; }
          .about-box-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

          /* ===== 3. 일정표 (캘린더 디자인) ===== */
          .calendar-header-new {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }
          .cal-title-left h1 { font-size: 32px; font-weight: 900; margin-bottom: 10px; }
          .cal-nav { display: flex; align-items: center; gap: 15px; }
          .nav-arrow {
            background: none; border: none; padding: 0; margin: 0;
            color: var(--text-sub); cursor: pointer; display: flex; align-items: center;
            transition: color 0.2s;
          }
          .nav-arrow:hover { color: var(--point-color); }
          #current-month-year { font-size: 15px; font-weight: 600; color: var(--text-sub); }

          /* 월간 캘린더 */
          #cal-month-view {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
          }
          .cal-day-head {
            text-align: center; padding: 15px 0; font-weight: 700; font-size: 14px;
            border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.02);
          }
          .cal-cell {
            height: 120px; border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);
            padding: 10px; box-sizing: border-box;
          }
          .cal-cell.empty { background-color: transparent; }
          
          /* 월간 이벤트 셀 배경색 */
          .cal-cell.bg-orange { background-color: var(--bg-point-light); }
          .cal-cell.bg-yellow { background-color: #fff9e6; }
          .cal-cell.bg-blue { background-color: #e6f4ff; }
          .cal-cell.bg-pink { background-color: #fff0f5; }

          .cal-cell .date { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
          .cal-cell .sch-txt { font-size: 12px; font-weight: 600; line-height: 1.4; color: var(--text-main); }

          /* 주간 캘린더 (사진 참고 디자인) */
          #cal-week-view {
            display: none;
            grid-template-columns: repeat(7, 1fr);
            gap: 15px;
            margin-top: 20px;
          }
          .cal-week-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 15px;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          }
          .cal-week-date {
            font-size: 15px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 15px;
          }
          
          /* 주간 이벤트 알약(Pill) 디자인 */
          .event-pill {
            font-size: 11px;
            font-weight: 800;
            padding: 6px 8px;
            border-radius: 6px;
            text-align: left;
            word-break: keep-all;
          }
          .pill-blue { background-color: #8cd4f5; color: #000; } /* 하늘색 */
          .pill-pink { background-color: #ffd1dc; color: #000; } /* 연핑크 */
          .pill-orange { background-color: #ffd8a8; color: #000; } /* 연주황 */

          /* ===== 서브 탭 버튼 공통 ===== */
          .sub-tabs { display: flex; gap: 10px; margin-bottom: 30px; }
          .sub-tab-btn { padding: 10px 20px; border: none; background-color: var(--bg-body); color: var(--text-sub); border-radius: 20px; font-weight: bold; cursor: pointer; transition: 0.2s; }
          .sub-tab-btn.active { background-color: var(--text-main); color: var(--bg-card); }

          /* ===== 4. 노래책 ===== */
          .search-bar { display: flex; gap: 10px; margin-bottom: 20px; }
          .search-bar input { padding: 10px 15px; border: 1px solid var(--border-color); border-radius: 8px; width: 250px; background: transparent; color: var(--text-main); }
          .song-table { width: 100%; border-collapse: collapse; }
          .song-table th { text-align: left; padding: 15px 10px; font-size: 13px; color: var(--text-sub); border-bottom: 1px solid var(--border-color); }
          .song-table td { padding: 15px 10px; font-size: 14px; border-bottom: 1px solid var(--border-color); }
          .song-group-title { background-color: var(--bg-point-light); border-radius: 8px; padding: 10px 15px; font-weight: bold; color: var(--point-color); font-size: 14px; margin-top: 20px; display: inline-block; }

          /* ===== 기타 탭 ===== */
          .empty-state { text-align: left; margin-top: 50px; font-size: 14px; color: var(--text-sub); }
          .game-card { background-color: var(--bg-body); border-radius: 12px; padding: 40px; text-align: center; max-width: 400px; margin: 0 auto; }
          .game-card .step { background-color: var(--text-main); color: var(--bg-card); font-size: 12px; padding: 3px 10px; border-radius: 10px; display: inline-block; margin-bottom: 15px; }
          .game-card h3 { font-size: 20px; margin-bottom: 10px; }
          .counter-box { display: flex; align-items: center; justify-content: center; gap: 20px; margin: 30px 0; }
          .counter-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 20px; cursor: pointer; color: var(--text-main); }
          .counter-num { font-size: 24px; font-weight: bold; color: var(--point-color); }
          .btn-next { background-color: var(--text-main); color: var(--bg-card); padding: 15px 40px; border-radius: 30px; border: none; font-weight: bold; cursor: pointer; }

          /* ===== 뮤직 팝업 ===== */
          #music-popup {
            display: none; position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
            width: 320px; background-color: var(--bg-card); border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 200; padding: 15px; border: 1px solid var(--border-color);
            animation: popDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          @keyframes popDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
          .popup-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .popup-header span { font-size: 11px; font-weight: bold; color: var(--point-color); }
          .close-btn { background: none; border: none; color: var(--text-sub); cursor: pointer; }
          .video-container { width: 100%; height: 180px; background-color: #000; border-radius: 8px; overflow: hidden; margin-bottom: 15px; }
          .music-controls { display: flex; align-items: center; gap: 10px; }
          .progress-bar { flex: 1; height: 4px; background-color: var(--bg-body); border-radius: 2px; }
          .progress-fill { width: 70%; height: 100%; background-color: var(--point-color); border-radius: 2px; }

          /* ===== INFO 링크 ===== */
          .link-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
          .link-card { display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid var(--border-color); border-radius: 12px; transition: border-color 0.2s; }
          .link-card:hover { border-color: var(--point-color); }
          .link-left { display: flex; align-items: center; gap: 15px; }
          .link-icon { font-size: 24px; color: var(--point-color); }
          .link-txt h4 { margin: 0 0 3px 0; font-size: 15px; }
          .link-txt p { margin: 0; font-size: 12px; color: var(--text-sub); }
          .link-right { font-size: 11px; font-weight: bold; color: var(--point-color); }

        </style>
      </head>
      <body>

        <!-- 상단 네비게이션 바 -->
        <nav class="nav-container">
          <button class="nav-btn active" onclick="switchTab('tab-home', this)"><span class="material-symbols-rounded">home</span></button>
          <button class="nav-btn" onclick="switchTab('tab-profile', this)"><span class="material-symbols-rounded">person</span></button>
          <button class="nav-btn" onclick="switchTab('tab-schedule', this)"><span class="material-symbols-rounded">calendar_today</span></button>
          <button class="nav-btn" onclick="toggleMusicPopup()"><span class="material-symbols-rounded">music_note</span></button>
          <button class="nav-btn" onclick="switchTab('tab-closet', this)"><span class="material-symbols-rounded">checkroom</span></button>
          <button class="nav-btn" onclick="switchTab('tab-upbo', this)"><span class="material-symbols-rounded">receipt_long</span></button>
          <button class="nav-btn" onclick="switchTab('tab-game', this)"><span class="material-symbols-rounded">sports_esports</span></button>
          <button class="nav-btn" onclick="switchTab('tab-info', this)"><span class="material-symbols-rounded">info</span></button>
          <button class="nav-btn" onclick="toggleTheme()" id="themeToggleBtn"><span class="material-symbols-rounded">dark_mode</span></button>
        </nav>

        <!-- 뮤직 플레이어 팝업 -->
        <div id="music-popup">
          <div class="popup-header">
            <div>
              <span>NOW PLAYING</span><br>
              <strong style="font-size:14px;">Song Hyun BGM</strong>
            </div>
            <button class="close-btn" onclick="toggleMusicPopup()"><span class="material-symbols-rounded">close</span></button>
          </div>
          <div class="video-container">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="music-controls">
            <span class="material-symbols-rounded" style="font-size:16px;">volume_up</span>
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <span style="font-size:11px; font-weight:bold;">70%</span>
          </div>
        </div>

        <!-- 1. 홈 탭 -->
        <section id="tab-home" class="tab-section active">
          <div class="fullscreen-bg"></div>
        </section>

        <!-- 2. 프로필 탭 -->
        <section id="tab-profile" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>PROFILE</h2><span>/ 프로필</span>
            </div>
            <div class="content-card">
              <div class="profile-grid">
                <div>
                  <img src="여기에_실제_이미지_주소를_넣으세요.jpg" class="profile-img" alt="프로필 이미지">
                </div>
                <div>
                  <div class="profile-info">
                    <h1>Song Hyun</h1>
                    <p class="sub">송현 | Virtual Streamer</p>
                    <table class="info-table">
                      <tr><th>AGE</th><th>DEBUT</th></tr>
                      <tr><td>17</td><td>2025.02.22</td></tr>
                      <tr><th>BIRTHDAY</th><th>FAN NAME</th></tr>
                      <tr><td>06.08</td><td>황숭이</td></tr>
                    </table>

                    <div class="like-section">
                      <h3>LIKE</h3>
                      <div class="like-icons">
                        <div class="like-item">
                          <div class="like-circle"><span class="material-symbols-rounded">music_note</span></div>
                          <span class="label">노래</span>
                        </div>
                        <div class="like-item">
                          <div class="like-circle"><span class="material-symbols-rounded">tv</span></div>
                          <span class="label">애니메이션</span>
                        </div>
                        <div class="like-item">
                          <div class="like-circle"><span class="material-symbols-rounded">ramen_dining</span></div>
                          <span class="label">국물 면요리</span>
                        </div>
                      </div>
                    </div>

                    <div class="about-section">
                      <div class="about-box">
                        <h3 style="color:var(--point-color); font-size:12px; margin-bottom:20px;">ABOUT SONG HYUN 방송 & 캐릭터 정보</h3>
                        <div class="about-box-grid">
                          <div><span style="font-size:12px; color:var(--text-sub);">MBTI</span><br><strong>ISTP</strong></div>
                          <div><span style="font-size:12px; color:var(--text-sub);">특이사항</span><br><strong>짱구</strong></div>
                          <div><span style="font-size:12px; color:var(--text-sub);">방송 시간</span><br><strong>오후 6시 ~ 오전 12시</strong></div>
                          <div><span style="font-size:12px; color:var(--text-sub);">팬닉</span><br><strong>OOOⓖ</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 일정표 탭 (동적 캘린더) -->
        <section id="tab-schedule" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>SCHEDULE</h2><span>/ 일정</span>
            </div>
            <div class="content-card">
              
              <div class="calendar-header-new">
                <div class="cal-title-left">
                  <h1>SCHEDULE</h1>
                  <div class="cal-nav">
                    <button class="nav-arrow" onclick="changeDate(-1)"><span class="material-symbols-rounded">chevron_left</span></button>
                    <span id="current-month-year">2026년 8월</span>
                    <button class="nav-arrow" onclick="changeDate(1)"><span class="material-symbols-rounded">chevron_right</span></button>
                  </div>
                </div>
                <div class="sub-tabs" style="margin-bottom:0;">
                  <button class="sub-tab-btn" id="btn-week" onclick="toggleCalendarView('week')">주간</button>
                  <button class="sub-tab-btn active" id="btn-month" onclick="toggleCalendarView('month')">월간</button>
                </div>
              </div>

              <!-- 월간 달력 -->
              <div id="cal-month-view"></div>
              
              <!-- 주간 달력 -->
              <div id="cal-week-view"></div>

            </div>
          </div>
        </section>

        <!-- 4. 노래책 탭 -->
        <section id="tab-songbook" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>SONG BOOK ♫</h2><span>/ 노래책</span>
            </div>
            <div class="content-card">
              <div class="search-bar">
                <input type="text" placeholder="노래 검색...">
                <select style="padding:10px; border-radius:8px; border:1px solid var(--border-color); background:transparent; color:var(--text-main);">
                  <option>전체</option>
                </select>
              </div>
              <table class="song-table">
                <tr><th>번호</th><th>가수</th><th>노래제목</th><th>난이도</th><th>상태</th></tr>
              </table>
              <div class="song-group-title">♫ 0720</div>
              <table class="song-table">
                <tr><td>01</td><td>0720</td><td>떡볶이 먹고 갈래?</td><td>♡ ♡ ♡</td><td>ㅡ</td></tr>
              </table>
              <div class="song-group-title">♫ 권진아</div>
              <table class="song-table">
                <tr><td>02</td><td>권진아</td><td>끝</td><td>ㅡ</td><td>ㅡ</td></tr>
                <tr><td>03</td><td>권진아</td><td>뭔가 잘못됐어</td><td>ㅡ</td><td>ㅡ</td></tr>
                <tr><td>04</td><td>권진아</td><td>위로</td><td>ㅡ</td><td>ㅡ</td></tr>
              </table>
            </div>
          </div>
        </section>

        <!-- 5. 의상실 탭 -->
        <section id="tab-closet" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>CLOSET</h2><span>/ 의상 리스트</span>
            </div>
            <div class="content-card">
              <div class="sub-tabs">
                <button class="sub-tab-btn active">기본의상</button>
                <button class="sub-tab-btn">이벤트의상</button>
                <button class="sub-tab-btn">헤어</button>
              </div>
              <div style="width:100%; max-width:400px; height:600px; border-radius:16px; background:url('https://via.placeholder.com/400x600/333/fff?text=Closet+3D+Model') center/cover;"></div>
            </div>
          </div>
        </section>

        <!-- 6. 업보 탭 -->
        <section id="tab-upbo" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>업보 ♡</h2><span>/ 리스트</span>
            </div>
            <div class="content-card">
              <p style="font-size:14px; color:var(--text-sub);">시청자 카드를 누르면 어떤 업보가 있는지 자세히 볼 수 있어요.</p>
              <div class="empty-state">등록된 업보가 없습니다.</div>
            </div>
          </div>
        </section>

        <!-- 7. 미니게임 탭 -->
        <section id="tab-game" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>사다리게임</h2><span>/ 미니게임</span>
            </div>
            <div class="content-card">
              <div class="sub-tabs">
                <button class="sub-tab-btn active">사다리게임</button>
                <button class="sub-tab-btn">핀볼게임</button>
              </div>
              <div class="game-card">
                <div class="step">STEP 1</div>
                <h3>참가 인원을 선택해주세요</h3>
                <p style="font-size:13px; color:var(--text-sub);">2명부터 12명까지 참여할 수 있어요.</p>
                <div class="counter-box">
                  <button class="counter-btn">-</button>
                  <div class="counter-num">4<br><span style="font-size:12px; color:var(--text-sub); font-weight:normal;">명</span></div>
                  <button class="counter-btn">+</button>
                </div>
                <button class="btn-next">다음</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 8. INFO 탭 -->
        <section id="tab-info" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>Song Hyun Links</h2><span>/ INFO / LINKS</span>
            </div>
            <div class="content-card">
              <p style="font-size:14px; color:var(--text-sub);">Official contact, character credit and community links.</p>
              <div class="link-grid">
                <a href="#" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#EA4335;">mail</span>
                    <div class="link-txt"><h4>Contact Email</h4><p>이메일주소@gmail.com</p></div>
                  </div>
                  <div class="link-right">MAIL ↗</div>
                </a>
                <a href="#" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#555;">person</span>
                    <div class="link-txt"><h4>Character</h4><p>캐릭터 디자인 크레딧</p></div>
                  </div>
                  <div class="link-right">CREDIT</div>
                </a>
                <a href="https://www.youtube.com/@songhy___/featured" target="_blank" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#FF0000;">smart_display</span>
                    <div class="link-txt"><h4>YouTube</h4><p>Song Hyun Channel</p></div>
                  </div>
                  <div class="link-right">VIDEO ↗</div>
                </a>
                <a href="https://www.sooplive.com/station/songhy" target="_blank" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#03C75A;">coffee</span>
                    <div class="link-txt"><h4>SOOP</h4><p>Official Broadcasting</p></div>
                  </div>
                  <div class="link-right">COMMUNITY ↗</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- 기능 스크립트 -->
        <script>
          // ===== 탭 및 테마 전환 로직 =====
          function switchTab(tabId, clickedBtn) {
            document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => {
              if(!btn.innerHTML.includes('music_note') && !btn.innerHTML.includes('mode')) {
                btn.classList.remove('active');
              }
            });
            document.getElementById(tabId).classList.add('active');
            if(clickedBtn) clickedBtn.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          function toggleTheme() {
            const htmlTag = document.documentElement;
            const themeIcon = document.querySelector('#themeToggleBtn .material-symbols-rounded');
            if (htmlTag.getAttribute('data-theme') === 'light') {
              htmlTag.setAttribute('data-theme', 'dark');
              themeIcon.textContent = 'light_mode'; 
            } else {
              htmlTag.setAttribute('data-theme', 'light');
              themeIcon.textContent = 'dark_mode'; 
            }
          }

          function toggleMusicPopup() {
            const popup = document.getElementById('music-popup');
            popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
          }


          // ===== 동적 달력(Calendar) 로직 =====
          let currentDate = new Date(2026, 7, 1); // 2026년 8월 1일 (JS 달은 0부터 시작)
          let calView = 'month'; // 'month' 또는 'week'

          // 예시 일정 데이터 (형식: '년-월-일')
          const mockEvents = {
            '2026-8-9': [{ text: '런닝크루 PEAK', color: 'blue' }],
            '2026-8-11': [{ text: '소하님 웰드', color: 'yellow' }],
            '2026-8-12': [{ text: '소하님 웰드', color: 'yellow' }],
            '2026-8-13': [{ text: '소하님 웰드', color: 'pink' }], /* 테스트용 연핑크 */
            '2026-8-14': [{ text: '옥독님 마크빙고', color: 'orange' }],
            '2026-8-15': [{ text: '옥독님 마크빙고', color: 'orange' }, { text: '런닝크루 PEAK', color: 'blue' }],
            '2026-8-16': [{ text: '옥독님 마크빙고', color: 'orange' }]
          };

          function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); // 0~11
            
            // 상단 텍스트 변경
            if(calView === 'month') {
              document.getElementById('current-month-year').innerText = year + '년 ' + (month + 1) + '월';
            } else {
              // 주간뷰일때도 현재 보고있는 날짜의 달을 표시
              const tempDate = new Date(currentDate);
              tempDate.setDate(currentDate.getDate() - currentDate.getDay());
              document.getElementById('current-month-year').innerText = tempDate.getFullYear() + '년 ' + (tempDate.getMonth() + 1) + '월 (주간)';
            }

            if (calView === 'month') {
              document.getElementById('cal-month-view').style.display = 'grid';
              document.getElementById('cal-week-view').style.display = 'none';
              renderMonth(year, month);
            } else {
              document.getElementById('cal-month-view').style.display = 'none';
              document.getElementById('cal-week-view').style.display = 'grid';
              renderWeek(currentDate);
            }
          }

          function renderMonth(year, month) {
            const grid = document.getElementById('cal-month-view');
            grid.innerHTML = '<div class="cal-day-head">일</div><div class="cal-day-head">월</div><div class="cal-day-head">화</div><div class="cal-day-head">수</div><div class="cal-day-head">목</div><div class="cal-day-head">금</div><div class="cal-day-head">토</div>';

            const firstDay = new Date(year, month, 1).getDay(); // 이번달 1일의 요일
            const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번달 총 일수
            
            // 칸수 계산: 1일 앞의 빈칸 + 총 일수를 더한 후 7의 배수로 꽉 차게 만들기 (최대 31일 주까지)
            const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

            for (let i = 0; i < totalCells; i++) {
              if (i < firstDay || i >= firstDay + daysInMonth) {
                // 이전 달 / 다음 달 빈칸
                grid.innerHTML += '<div class="cal-cell empty"></div>';
              } else {
                // 이번 달 실제 날짜
                const dateNum = i - firstDay + 1;
                const dateKey = year + '-' + (month + 1) + '-' + dateNum;
                const dayEvents = mockEvents[dateKey] || [];

                let eventHtml = '';
                let bgClass = ''; 
                
                dayEvents.forEach(ev => {
                  eventHtml += '<div class="sch-txt">' + ev.text + '</div>';
                  if(!bgClass) bgClass = 'bg-' + ev.color; // 셀 전체 배경은 첫번째 일정 색으로
                });

                grid.innerHTML += '<div class="cal-cell ' + bgClass + '"><div class="date">' + dateNum + '</div>' + eventHtml + '</div>';
              }
            }
          }

          function renderWeek(date) {
            const grid = document.getElementById('cal-week-view');
            grid.innerHTML = '';
            
            // 현재 날짜가 속한 주의 일요일(0) 찾기
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay());

            const daysArr = ['일', '월', '화', '수', '목', '금', '토'];

            for (let i = 0; i < 7; i++) {
              const curr = new Date(startOfWeek);
              curr.setDate(startOfWeek.getDate() + i);
              const y = curr.getFullYear();
              const m = curr.getMonth() + 1;
              const d = curr.getDate();
              const dateKey = y + '-' + m + '-' + d;

              const dayEvents = mockEvents[dateKey] || [];
              let eventHtml = '';
              
              dayEvents.forEach(ev => {
                eventHtml += '<div class="event-pill pill-' + ev.color + '">' + ev.text + '</div>';
              });

              grid.innerHTML += '<div class="cal-week-card"><div class="cal-week-date">' + m + '/' + d + ' ' + daysArr[i] + '</div>' + eventHtml + '</div>';
            }
          }

          function changeDate(dir) {
            if (calView === 'month') {
              // 월간뷰: 한 달 이동
              currentDate.setMonth(currentDate.getMonth() + dir);
            } else {
              // 주간뷰: 일주일(7일) 이동
              currentDate.setDate(currentDate.getDate() + (dir * 7));
            }
            renderCalendar();
          }

          function toggleCalendarView(view) {
            calView = view;
            document.getElementById('btn-month').classList.remove('active');
            document.getElementById('btn-week').classList.remove('active');
            document.getElementById('btn-' + view).classList.add('active');
            renderCalendar();
          }

          // 페이지 로드 시 캘린더 초기화
          document.addEventListener('DOMContentLoaded', () => {
            renderCalendar();
          });
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
