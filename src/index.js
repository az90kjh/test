export default {
  async fetch(request, env, ctx) {
    const html = `
      <!DOCTYPE html>
      <html lang="ko" data-theme="light">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Song Hyun | 스트리머 프로필</title>
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

          body { margin: 0; padding: 0; font-family: 'Pretendard', sans-serif; background-color: var(--bg-body); color: var(--text-main); transition: background-color 0.3s, color 0.3s; overflow-x: hidden; }
          h1, h2, h3, p { margin: 0; }
          ul { list-style: none; padding: 0; margin: 0; }
          a { text-decoration: none; color: inherit; }

          /* ===== 상단 네비게이션 ===== */
          .nav-container {
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background-color: var(--bg-nav); border-radius: 30px; padding: 8px 15px; display: flex; gap: 12px; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          .nav-btn { background: none; border: none; color: var(--nav-icon); cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
          .nav-btn:hover { background-color: rgba(255,255,255,0.1); color: #fff; }
          .nav-btn.active { background-color: var(--bg-card); color: var(--nav-icon-active); box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .nav-btn .material-symbols-rounded { font-size: 22px; }

          /* ===== 홈 탭 (전체화면) ===== */
          .fullscreen-bg {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-image: url('https://via.placeholder.com/1920x1080/ff8200/ffffff?text=SONG+HYUN+MAIN+IMAGE');
            background-size: cover; background-position: center; background-repeat: no-repeat; z-index: -1;
          }

          /* ===== 메인 콘텐츠 영역 ===== */
          .main-wrapper { max-width: 1100px; margin: 100px auto 40px; padding: 0 20px; }
          .section-header-out { margin-bottom: 12px; padding-left: 5px; display: flex; align-items: center; gap: 8px; }
          .section-header-out h2 { font-size: 13px; font-weight: 800; color: var(--text-main); }
          .section-header-out span { font-size: 11px; color: var(--text-sub); }
          .content-card { background-color: var(--bg-card); border-radius: 20px; padding: 40px; min-height: 700px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: background-color 0.3s; }
          .tab-section { display: none; animation: fadeIn 0.3s ease-in-out; }
          .tab-section.active { display: block; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

          /* ===== 2. 프로필 탭 ===== */
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
          
          /* 어바웃(ABOUT) 박스 */
          .about-box { background-color: var(--bg-point-light); border-radius: 12px; padding: 25px; margin-bottom: 30px; }
          .about-box h3 { color: var(--point-color); font-size: 12px; padding-bottom: 15px; border-bottom: 1px dashed rgba(0,0,0,0.1); margin-bottom: 15px; }
          [data-theme="dark"] .about-box h3 { border-bottom-color: rgba(255,255,255,0.2); }
          .about-box-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .about-divider { grid-column: span 2; border-top: 1px dashed rgba(0,0,0,0.1); margin: 0; }
          [data-theme="dark"] .about-divider { border-top-color: rgba(255,255,255,0.2); }
          
          /* 구독 뱃지 */
          .badge-section { background-color: var(--bg-point-light); border-radius: 12px; padding: 25px; }
          .badge-section h3 { color: var(--point-color); font-size: 12px; padding-bottom: 15px; border-bottom: 1px dashed rgba(0,0,0,0.1); margin-bottom: 20px; }
          [data-theme="dark"] .badge-section h3 { border-bottom-color: rgba(255,255,255,0.2); }
          .badge-container { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
          .badge-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
          .badge-img { width: 45px; height: 45px; object-fit: contain; }
          .badge-label { font-size: 11px; color: var(--text-sub); font-weight: 600; text-align: center; }
          .badge-line { flex: 1; height: 1px; background-color: rgba(0,0,0,0.1); margin-bottom: 15px; }
          [data-theme="dark"] .badge-line { background-color: rgba(255,255,255,0.2); }

          /* ===== 최근 작성글 (SOOP POSTS) ===== */
          .recent-posts { background-color: var(--bg-point-light); border-radius: 12px; padding: 20px; margin-top: 20px; }
          .recent-posts-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 15px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 12px; }
          [data-theme="dark"] .recent-posts-header { border-bottom-color: rgba(255,255,255,0.2); }
          .recent-posts-more { font-size: 11px; font-weight: 700; color: var(--point-color); transition: 0.2s; }
          .recent-posts-more:hover { filter: brightness(0.8); }
          .recent-posts-list { display: flex; flex-direction: column; gap: 12px; }
          .post-item { display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: var(--text-main); transition: 0.2s; padding: 5px 0; }
          .post-item:hover .post-title { color: var(--point-color); }
          .post-title-row { display: flex; align-items: center; gap: 8px; }
          .post-badge { background-color: rgba(0,0,0,0.05); color: var(--text-sub); font-size: 10px; font-weight: 800; padding: 3px 6px; border-radius: 4px; white-space: nowrap; }
          [data-theme="dark"] .post-badge { background-color: rgba(255,255,255,0.1); color: var(--text-main); }
          .post-badge.notice { background-color: var(--point-color); color: #fff; }
          .post-title { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
          .post-meta { display: flex; align-items: center; font-size: 11px; color: var(--text-sub); }

          /* ===== 일정표 탭 ===== */
          .calendar-header-new { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .cal-title-left h1 { font-size: 32px; font-weight: 900; margin-bottom: 10px; }
          .cal-nav { display: flex; align-items: center; gap: 15px; }
          .nav-arrow { background: none; border: none; padding: 0; margin: 0; color: var(--text-sub); cursor: pointer; display: flex; align-items: center; transition: color 0.2s; }
          .nav-arrow:hover { color: var(--point-color); }
          #current-month-year { font-size: 15px; font-weight: 600; color: var(--text-sub); }
          #cal-month-view { display: grid; grid-template-columns: repeat(7, 1fr); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
          .cal-day-head { text-align: center; padding: 15px 0; font-weight: 700; font-size: 14px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.02); }
          .cal-cell { height: 120px; border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 10px; box-sizing: border-box; }
          .cal-cell.empty { background-color: transparent; }
          .cal-cell.bg-orange { background-color: var(--bg-point-light); }
          .cal-cell.bg-yellow { background-color: #fff9e6; }
          .cal-cell.bg-blue { background-color: #e6f4ff; }
          .cal-cell.bg-pink { background-color: #fff0f5; }
          .cal-cell .date { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
          .cal-cell .sch-txt { font-size: 12px; font-weight: 600; line-height: 1.4; color: var(--text-main); }
          #cal-week-view { display: none; grid-template-columns: repeat(7, 1fr); gap: 15px; margin-top: 20px; }
          .cal-week-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 15px; min-height: 250px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
          .cal-week-date { font-size: 15px; font-weight: 800; color: var(--text-main); margin-bottom: 15px; }
          .event-pill { font-size: 11px; font-weight: 800; padding: 6px 8px; border-radius: 6px; text-align: left; word-break: keep-all; }
          .pill-blue { background-color: #8cd4f5; color: #000; } 
          .pill-pink { background-color: #ffd1dc; color: #000; } 
          .pill-orange { background-color: #ffd8a8; color: #000; } 

          /* ===== 서브 탭 버튼 공통 ===== */
          .sub-tabs { display: flex; gap: 10px; margin-bottom: 25px; }
          .sub-tab-btn { padding: 8px 18px; border: 1px solid var(--border-color); background-color: var(--bg-card); color: var(--text-sub); border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s; }
          .sub-tab-btn:hover { color: var(--point-color); border-color: var(--point-color); }
          .sub-tab-btn.active { background-color: var(--point-color); color: #ffffff; border-color: var(--point-color); }

          /* ===== 5. 의상실 (CLOSET) 스타일 ===== */
          .closet-sub-section { display: none; animation: fadeIn 0.3s ease-in-out; }
          .closet-sub-section.active { display: block; }
          .closet-card-grid { display: flex; gap: 25px; flex-wrap: wrap; }
          .closet-item-card { position: relative; width: 320px; height: 480px; border-radius: 16px; background-color: #1a1a1a; background-size: cover; background-position: center; border: 2px solid rgba(255,255,255,0.15); box-shadow: 0 10px 25px rgba(0,0,0,0.15); overflow: hidden; box-sizing: border-box; }
          .closet-tag-name { position: absolute; top: 15px; left: 15px; color: #ffffff; font-size: 14px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.6); z-index: 2; }
          .closet-tag-badge { position: absolute; top: 12px; right: 12px; background: #ff478e; color: #ffffff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 10px; z-index: 2; }
          .closet-item-card::before, .closet-item-card::after { content: ''; position: absolute; width: 16px; height: 16px; pointer-events: none; z-index: 2; }
          .closet-item-card::before { top: 8px; left: 8px; border-top: 2px solid rgba(255,255,255,0.6); border-left: 2px solid rgba(255,255,255,0.6); }
          .closet-item-card::after { bottom: 8px; right: 8px; border-bottom: 2px solid rgba(255,255,255,0.6); border-right: 2px solid rgba(255,255,255,0.6); }
          .closet-card-bottom { position: absolute; bottom: 0; left: 0; width: 100%; padding: 15px; box-sizing: border-box; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%); display: flex; justify-content: space-between; align-items: center; z-index: 2; }
          .closet-bottom-btn { background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
          .closet-bottom-icons { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); font-size: 12px; }

          /* ===== 노래책 ===== */
          .search-bar { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }
          .search-bar input { padding: 10px 15px; border: 1px solid var(--border-color); border-radius: 8px; width: 250px; background: transparent; color: var(--text-main); }
          .refresh-btn { background: var(--bg-body); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; cursor: pointer; color: var(--text-sub); display: flex; align-items: center; justify-content: center; transition: 0.2s; }
          .refresh-btn:hover { color: var(--point-color); }
          .song-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .song-table th, .song-table td { padding: 15px 10px; border-bottom: 1px solid var(--border-color); text-align: left; }
          .song-table th { font-size: 13px; color: var(--text-sub); font-weight: normal; }
          .song-table td { font-size: 14px; font-weight: 600; color: var(--text-main); }
          .group-header-row td { padding: 0 !important; border: none !important; }
          .group-header-box { display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-point-light); padding: 12px 20px; border-radius: 12px; margin-top: 20px; margin-bottom: 5px; }

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

        <!-- 상단 네비게이션 바 (뮤직 팝업 아이콘 8번째로 이동) -->
        <nav class="nav-container">
          <!-- 1 --> <button class="nav-btn active" onclick="switchTab('tab-home', this)"><span class="material-symbols-rounded">home</span></button>
          <!-- 2 --> <button class="nav-btn" onclick="switchTab('tab-profile', this)"><span class="material-symbols-rounded">person</span></button>
          <!-- 3 --> <button class="nav-btn" onclick="switchTab('tab-schedule', this)"><span class="material-symbols-rounded">calendar_today</span></button>
          <!-- 4 --> <button class="nav-btn" onclick="switchTab('tab-songbook', this)"><span class="material-symbols-rounded">lyrics</span></button>
          <!-- 5 --> <button class="nav-btn" onclick="switchTab('tab-closet', this)"><span class="material-symbols-rounded">checkroom</span></button>
          <!-- 6 --> <button class="nav-btn" onclick="switchTab('tab-upbo', this)"><span class="material-symbols-rounded">receipt_long</span></button>
          <!-- 7 --> <button class="nav-btn" onclick="switchTab('tab-game', this)"><span class="material-symbols-rounded">sports_esports</span></button>
          <!-- 8 --> <button class="nav-btn" onclick="toggleMusicPopup()"><span class="material-symbols-rounded">music_note</span></button>
          <!-- 9 --> <button class="nav-btn" onclick="switchTab('tab-info', this)"><span class="material-symbols-rounded">info</span></button>
          <!-- 10 --><button class="nav-btn" onclick="toggleTheme()" id="themeToggleBtn"><span class="material-symbols-rounded">dark_mode</span></button>
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
                  <img src="https://stimg.sooplive.com/NORMAL_BBS/8/10867168/96146a6d1713126b1.gif" class="profile-img" alt="프로필 이미지">
                  
                  <!-- 최근 작성글 (SOOP POSTS) 추가된 영역 -->
                  <div class="recent-posts">
                    <div class="recent-posts-header">
                      <div>
                        <div style="font-size: 10px; font-weight: 800; color: var(--point-color);">SOOP POSTS</div>
                        <h3 style="font-size: 16px; font-weight: 800; margin-top: 2px;">최근 게시글</h3>
                      </div>
                      <a href="https://bj.afreecatv.com/songhy/posts" target="_blank" class="recent-posts-more">전체보기 ↗</a>
                    </div>
                    <div id="soop-posts-container" class="recent-posts-list">
                      <!-- JS를 통해 게시글이 들어가는 곳 -->
                    </div>
                  </div>

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

                    <!-- 어바웃 섹션 (점선 추가됨) -->
                    <div class="about-section">
                      <div class="about-box">
                        <h3>ABOUT SONG HYUN 방송 & 캐릭터 정보</h3>
                        <div class="about-box-grid">
                          <div><span style="font-size:12px; color:var(--text-sub);">MBTI</span><br><strong>ISTP</strong></div>
                          <div><span style="font-size:12px; color:var(--text-sub);">특이사항</span><br><strong>짱구</strong></div>
                          
                          <!-- 중간 점선 구분선 -->
                          <div class="about-divider"></div>
                          
                          <div><span style="font-size:12px; color:var(--text-sub);">방송 시간</span><br><strong>오후 6시 ~ 오전 12시</strong></div>
                          <div><span style="font-size:12px; color:var(--text-sub);">팬닉</span><br><strong>OOOⓖ</strong></div>
                        </div>
                      </div>

                      <!-- 뱃지 섹션 (총 8개로 확장됨) -->
                      <div class="badge-section">
                        <h3>구독 뱃지</h3>
                        <div class="badge-container">
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/712167750e1c89765.png?_=1735785281" class="badge-img" alt="1개월"><span class="badge-label">1개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/881767750e2d3027d.png?_=1735785621" class="badge-img" alt="2개월"><span class="badge-label">2개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/858167750e3bac1d0.png?_=1735785281" class="badge-img" alt="3개월"><span class="badge-label">3개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/586567750e4d033ea.png?_=1735785281" class="badge-img" alt="6개월"><span class="badge-label">6개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/633267750e5a56209.png?_=1735785281" class="badge-img" alt="9개월"><span class="badge-label">9개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/453267750e691eeb1.png?_=1735785281" class="badge-img" alt="12개월"><span class="badge-label">12개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/933867750e78402f8.png?_=1735785281" class="badge-img" alt="18개월"><span class="badge-label">18개월</span></div>
                          <div class="badge-line"></div>
                          <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/562567750e855a507.png?_=1735785281" class="badge-img" alt="24개월"><span class="badge-label">24개월</span></div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 일정표 탭 -->
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
              <div id="cal-month-view"></div>
              <div id="cal-week-view"></div>
            </div>
          </div>
        </section>

        <!-- 4. 노래책 탭 (구글 시트 연동) -->
        <section id="tab-songbook" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>SONG BOOK ♫</h2><span>/ 노래책</span>
            </div>
            <div class="content-card">
              <div class="search-bar">
                <input type="text" id="song-search-input" onkeyup="filterSongs()" placeholder="노래 제목이나 가수를 검색해보세요...">
                <button class="refresh-btn" onclick="loadSongs()" title="실시간 새로고침"><span class="material-symbols-rounded" style="font-size:18px;">refresh</span></button>
              </div>
              
              <div id="songbook-list">
                <div style="text-align:center; padding: 50px; color: var(--text-sub);">
                  <span class="material-symbols-rounded" style="font-size:40px; animation: spin 2s linear infinite;">sync</span><br><br>
                  모든 시트 탭의 노래 목록을 빠짐없이 불러오는 중입니다...
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. 의상실 탭 (사진 디자인 및 서브 탭 완벽 적용) -->
        <section id="tab-closet" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>CLOSET</h2><span>/ 의상 리스트</span>
            </div>
            <div class="content-card">
              <div style="margin-bottom: 20px;">
                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 6px;">CLOSET</h1>
                <p style="font-size: 13px; color: var(--text-sub);">의상을 누르면 전체 이미지와 ON/OFF 가능한 부위를 볼 수 있어요.</p>
              </div>

              <!-- 서브 탭 메뉴 -->
              <div class="sub-tabs">
                <button class="sub-tab-btn active" onclick="switchClosetTab('closet-default', this)">기본의상</button>
                <button class="sub-tab-btn" onclick="switchClosetTab('closet-event', this)">이벤트의상</button>
                <button class="sub-tab-btn" onclick="switchClosetTab('closet-hair', this)">헤어</button>
              </div>

              <!-- 1) 기본의상 영역 -->
              <div id="closet-default" class="closet-sub-section active">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_기본의상_이미지_주소.jpg');">
                    <span class="closet-tag-name">스텔라</span>
                    <span class="closet-tag-badge">NEW</span>
                    <div class="closet-card-bottom">
                      <span class="closet-bottom-btn">기본의상</span>
                      <div class="closet-bottom-icons">
                        <span>+6</span>
                        <span class="material-symbols-rounded" style="font-size: 16px;">visibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2) 이벤트의상 영역 -->
              <div id="closet-event" class="closet-sub-section">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_이벤트의상_이미지_주소.jpg');">
                    <span class="closet-tag-name">파티 드레스</span>
                    <div class="closet-card-bottom">
                      <span class="closet-bottom-btn">이벤트의상</span>
                      <div class="closet-bottom-icons">
                        <span class="material-symbols-rounded" style="font-size: 16px;">visibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3) 헤어 영역 -->
              <div id="closet-hair" class="closet-sub-section">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_헤어_이미지_주소.jpg');">
                    <span class="closet-tag-name">단발 펌</span>
                    <div class="closet-card-bottom">
                      <span class="closet-bottom-btn">헤어</span>
                      <div class="closet-bottom-icons">
                        <span class="material-symbols-rounded" style="font-size: 16px;">visibility</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

        <!-- 8. INFO 탭 (9번째 메뉴 버튼) -->
        <section id="tab-info" class="tab-section">
          <div class="main-wrapper">
            <div class="section-header-out">
              <h2>Song Hyun Links</h2><span>/ INFO / LINKS</span>
            </div>
            <div class="content-card">
              <p style="font-size:14px; color:var(--text-sub);">Official contact, character credit and community links.</p>
              <div class="link-grid">
                
                <!-- 1. Contact Email (초록색 이모티콘으로 변경) -->
                <a href="#" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#03C75A;">mail</span>
                    <div class="link-txt"><h4>Contact Email</h4><p>songhy___@naver.com</p></div>
                  </div>
                  <div class="link-right">MAIL ↗</div>
                </a>
                
                <!-- 2. Official Broadcasting (SOOP 아이콘 이미지로 변경) -->
                <a href="https://www.sooplive.com/station/songhy" class="link-card">
                  <div class="link-left">
                    <!-- 👇 아래 src 부분에 SOOP 로고 이미지 링크를 넣어주세요 👇 -->
                    <img src="https://res.sooplive.com/images/svg/soop_logo.svg" style="width:24px; height:24px; object-fit:contain; margin-right:5px;" alt="SOOP">
                    <div class="link-txt"><h4>Official Broadcasting</h4><p>SOOP 방송국</p></div>
                  </div>
                  <div class="link-right">BROADCAST ↗</div>
                </a>
                
                <!-- 3. YouTube -->
                <a href="https://www.youtube.com/@songhy___/featured" target="_blank" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#FF0000;">smart_display</span>
                    <div class="link-txt"><h4>YouTube</h4><p>Song Hyun Channel</p></div>
                  </div>
                  <div class="link-right">VIDEO ↗</div>
                </a>
                
                <!-- 4. 카페 커뮤니티 -->
                <a href="https://cafe.naver.com/songhysonghy" target="_blank" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#03C75A;">coffee</span>
                    <div class="link-txt"><h4>COMMUNITY</h4><p>황숭이 수용소</p></div>
                  </div>
                  <div class="link-right">CAFE ↗</div>
                </a>

                <!-- 5. 새롭게 추가된 다섯 번째 링크 -->
                <a href="https://fancim.me/celeb/profile.aspx?cu_id=iM+/awzH7YMmAi0xh2mppg==" target="_blank" class="link-card">
                  <div class="link-left">
                    <span class="material-symbols-rounded link-icon" style="color:#888888;">link</span>
                    <div class="link-txt"><h4>Fansim</h4><p>sending gift</p></div>
                  </div>
                  <div class="link-right">LINK ↗</div>
                </a>

              </div>
            </div>
          </div>
        </section>

        <!-- 기능 스크립트 모음 -->
        <script>
          /* ===== 탭 및 테마 전환 ===== */
          function switchTab(tabId, clickedBtn) {
            document.querySelectorAll('.tab-section').forEach(function(sec) { sec.classList.remove('active'); });
            document.querySelectorAll('.nav-btn').forEach(function(btn) {
              if(btn.innerHTML.indexOf('music_note') === -1 && btn.innerHTML.indexOf('mode') === -1) {
                btn.classList.remove('active');
              }
            });
            document.getElementById(tabId).classList.add('active');
            if(clickedBtn) clickedBtn.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          /* ===== 의상실(CLOSET) 서브 탭 전환 ===== */
          function switchClosetTab(subTabId, clickedBtn) {
            document.querySelectorAll('.closet-sub-section').forEach(function(sec) { sec.classList.remove('active'); });
            var parentTabs = clickedBtn.parentElement.querySelectorAll('.sub-tab-btn');
            parentTabs.forEach(function(btn) { btn.classList.remove('active'); });
            
            document.getElementById(subTabId).classList.add('active');
            clickedBtn.classList.add('active');
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

          /* ===== 동적 캘린더 로직 ===== */
          let currentDate = new Date(); 
          let calView = 'month';

          const mockEvents = {
            '2026-8-9': [{ text: '런닝크루 PEAK', color: 'blue' }],
            '2026-8-11': [{ text: '소하님 웰드', color: 'yellow' }],
            '2026-8-12': [{ text: '소하님 웰드', color: 'yellow' }],
            '2026-8-13': [{ text: '소하님 웰드', color: 'pink' }],
            '2026-8-14': [{ text: '옥독님 마크빙고', color: 'orange' }],
            '2026-8-15': [{ text: '옥독님 마크빙고', color: 'orange' }, { text: '런닝크루 PEAK', color: 'blue' }],
            '2026-8-16': [{ text: '옥독님 마크빙고', color: 'orange' }]
          };

          function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); 
            
            if(calView === 'month') {
              document.getElementById('current-month-year').innerText = year + '년 ' + (month + 1) + '월';
            } else {
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

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate(); 
            const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

            for (let i = 0; i < totalCells; i++) {
              if (i < firstDay || i >= firstDay + daysInMonth) {
                grid.innerHTML += '<div class="cal-cell empty"></div>';
              } else {
                const dateNum = i - firstDay + 1;
                const dateKey = year + '-' + (month + 1) + '-' + dateNum;
                const dayEvents = mockEvents[dateKey] || [];
                let eventHtml = '';
                let bgClass = ''; 
                
                dayEvents.forEach(function(ev) {
                  eventHtml += '<div class="sch-txt">' + ev.text + '</div>';
                  if(!bgClass) bgClass = 'bg-' + ev.color; 
                });

                grid.innerHTML += '<div class="cal-cell ' + bgClass + '"><div class="date">' + dateNum + '</div>' + eventHtml + '</div>';
              }
            }
          }

          function renderWeek(date) {
            const grid = document.getElementById('cal-week-view');
            grid.innerHTML = '';
            
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
              
              dayEvents.forEach(function(ev) {
                eventHtml += '<div class="event-pill pill-' + ev.color + '">' + ev.text + '</div>';
              });
              grid.innerHTML += '<div class="cal-week-card"><div class="cal-week-date">' + m + '/' + d + ' ' + daysArr[i] + '</div>' + eventHtml + '</div>';
            }
          }

          function changeDate(dir) {
            if (calView === 'month') {
              currentDate.setMonth(currentDate.getMonth() + dir);
            } else {
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

          /* ===== 최근 작성글 연동(디자인 틀) 로직 ===== */
          function loadRecentPosts() {
            const container = document.getElementById('soop-posts-container');
            const dummyPosts = [
              { isNotice: true, title: "안녕하세요! 방송 관련 공지입니다💙", date: "2026.08.14", likes: 25, comments: 8 },
              { isNotice: false, title: "오늘 뱅송은 조금 늦을 것 같아요ㅠㅠ", date: "2026.08.12", likes: 14, comments: 3 },
              { isNotice: false, title: "어제 방송 너무 재밌었어요!!", date: "2026.08.10", likes: 32, comments: 15 }
            ];

            let html = '';
            dummyPosts.forEach(function(post) {
              let badge = post.isNotice ? '<span class="post-badge notice">공지</span>' : '<span class="post-badge">일반</span>';
              html += '<a href="https://bj.afreecatv.com/songhy/posts" target="_blank" class="post-item">' +
                  '<div class="post-title-row">' + badge + '<span class="post-title">' + post.title + '</span></div>' +
                  '<div class="post-meta">' +
                    '<span>' + post.date + '</span>' +
                    '<span class="material-symbols-rounded" style="font-size:11px; margin-left:8px; margin-right:2px;">favorite</span> ' + post.likes +
                    '<span class="material-symbols-rounded" style="font-size:11px; margin-left:8px; margin-right:2px;">chat_bubble</span> ' + post.comments +
                  '</div>' +
                '</a>';
            });
            
            container.innerHTML = html;
          }

          /* ===== 노래책 연동 로직 ===== */
          async function loadSongs() {
            const container = document.getElementById('songbook-list');
            container.innerHTML = '<div style="text-align:center; padding: 50px; color: var(--text-sub);"><span class="material-symbols-rounded" style="font-size:40px; animation: spin 2s linear infinite;">sync</span><br><br>모든 시트 탭의 노래 목록을 빠짐없이 불러오는 중입니다...</div>';
            
            try {
              const sheetId = '1wWQ5ziB4hHnhBqqktFb7Yc-Vu-AVrOxdcGBMX860pXQ';
              const sheetNames = ['k pop', 'pop', 'j pop', '오리지널 곡✨', '숙제곡💖']; 
              const grouped = {};
              let globalSongIndex = 1;

              const timestamp = new Date().getTime();
              const fetchPromises = sheetNames.map(async function(sheetName) {
                const url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:json&headers=0&sheet=' + encodeURIComponent(sheetName) + '&_=' + timestamp;
                const response = await fetch(url);
                let text = await response.text();
                
                text = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
                const data = JSON.parse(text);
                return { sheetName: sheetName, rows: data.table.rows };
              });

              const results = await Promise.all(fetchPromises);

              results.forEach(function(resultObj) {
                let sheetName = resultObj.sheetName;
                let rows = resultObj.rows;
                let lastSinger = sheetName;

                rows.forEach(function(row) {
                  if (!row || !row.c) return; 

                  let cells = row.c.map(function(cell) {
                    return (cell && cell.v !== null && cell.v !== undefined) ? String(cell.v).trim() : '';
                  });
                  
                  let rawSinger = cells[1] ? cells[1] : '';
                  let title = cells[2] ? cells[2] : '';
                  let diff = cells[3] ? cells[3] : 'ㅡ';
                  let status = cells[4] ? cells[4] : 'ㅡ';

                  let validTextList = cells.filter(function(t) { return t !== ''; });

                  if (!title && validTextList.length >= 2 && cells[0]) {
                    rawSinger = cells[0];
                    title = cells[1];
                  }

                  if (!title) return;

                  let checkStr = (rawSinger + " " + title).toLowerCase();
                  if (
                    checkStr.indexOf('송현 노래책') !== -1 || 
                    checkStr.indexOf('노래신청은') !== -1 || 
                    checkStr.indexOf('제목') !== -1 || 
                    checkStr.indexOf('가수') !== -1 ||
                    checkStr.indexOf('노래책 설명서') !== -1 ||
                    checkStr.indexOf('별풍 200개') !== -1 ||
                    checkStr.indexOf('이거 불러죠') !== -1 ||
                    checkStr.indexOf('블렀던곡') !== -1 ||
                    checkStr.indexOf('녹음음원') !== -1
                  ) {
                    return;
                  }

                  let singer = rawSinger ? rawSinger : lastSinger;
                  lastSinger = singer;

                  let no = cells[0] && cells[0].length < 5 ? cells[0] : String(globalSongIndex).padStart(2, '0');

                  if (!grouped[singer]) grouped[singer] = [];
                  grouped[singer].push({ 
                    no: no, 
                    title: title, 
                    difficulty: diff || 'ㅡ', 
                    status: status || 'ㅡ', 
                    sheetName: sheetName 
                  });
                  globalSongIndex++;
                });
              });
              
              if(Object.keys(grouped).length === 0) {
                  container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub);">등록된 노래가 없습니다. 구글 시트 내용을 확인해주세요.</div>';
                  return;
              }
              
              renderSongbookTable(grouped);

            } catch (err) {
              console.error(err);
              container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub);">구글 시트 연동에 실패했습니다.<br>시트 탭 이름이 정확한지 확인해주세요.</div>';
            }
          }

          function renderSongbookTable(grouped) {
            const container = document.getElementById('songbook-list');
            container.innerHTML = '<table class="song-table">' +
                '<thead>' +
                  '<tr>' +
                    '<th style="width: 10%;">번호</th>' +
                    '<th style="width: 15%;">가수</th>' +
                    '<th style="width: 45%;">노래제목</th>' +
                    '<th style="width: 15%;">난이도</th>' +
                    '<th style="width: 15%; text-align:center;">상태</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody id="songbook-tbody"></tbody>' +
              '</table>';
            
            const tbody = document.getElementById('songbook-tbody');
            
            for (const [singer, songs] of Object.entries(grouped)) {
              const headerTr = document.createElement('tr');
              headerTr.className = 'group-header-row';
              headerTr.innerHTML = '<td colspan="5">' +
                  '<div class="group-header-box">' +
                    '<div style="font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 8px;">' +
                      '<span class="material-symbols-rounded" style="color: var(--point-color); font-size:16px;">music_note</span>' +
                      singer +
                    '</div>' +
                    '<div style="font-size: 13px; color: var(--text-sub); font-weight: 600;">' + songs.length + '곡</div>' +
                  '</div>' +
                '</td>';
              tbody.appendChild(headerTr);
              
              songs.forEach(function(song) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td style="color: var(--text-sub); font-size: 13px;">' + song.no + '</td>' +
                  '<td style="color: var(--text-sub); font-size: 13px;">' + singer + '</td>' +
                  '<td style="font-weight: 600;">' + song.title + '</td>' +
                  '<td style="color: var(--point-color); font-size:12px;">' + song.difficulty + '</td>' +
                  '<td style="text-align: center; color: var(--text-sub);">' + song.status + '</td>';
                tbody.appendChild(tr);
              });
            }
          }

          function filterSongs() {
            const query = document.getElementById('song-search-input').value.toLowerCase();
            const tbody = document.getElementById('songbook-tbody');
            if (!tbody) return;
            
            const rows = tbody.querySelectorAll('tr');
            let currentGroupHeader = null;
            let visibleCountInGroup = 0;
            
            rows.forEach(function(row) {
              if (row.classList.contains('group-header-row')) {
                if (currentGroupHeader) {
                  currentGroupHeader.style.display = visibleCountInGroup > 0 ? '' : 'none';
                }
                currentGroupHeader = row;
                visibleCountInGroup = 0;
              } else {
                const text = row.textContent.toLowerCase();
                if (text.indexOf(query) !== -1) {
                  row.style.display = '';
                  visibleCountInGroup++;
                } else {
                  row.style.display = 'none';
                }
              }
            });
            if (currentGroupHeader) {
              currentGroupHeader.style.display = visibleCountInGroup > 0 ? '' : 'none';
            }
          }

          document.addEventListener('DOMContentLoaded', () => {
            renderCalendar();
            loadSongs();
            loadRecentPosts(); // 추가된 게시판 데이터 로드
          });

          const styleSheet = document.createElement("style");
          styleSheet.innerText = "@keyframes spin { 100% { transform: rotate(360deg); } }";
          document.head.appendChild(styleSheet);
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: { 
        "content-type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      },
    });
  },
};
