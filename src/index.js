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

          /* ===== 🌟 스마트폰 잠금화면 (블러 오버레이) ===== */
          #lock-screen {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            padding-top: 15vh; color: #ffffff; transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease;
            cursor: pointer; user-select: none;
          }
          #lock-screen.unlocked { transform: translateY(-100%); opacity: 0; pointer-events: none; }
          .lock-time { font-size: 80px; font-weight: 200; letter-spacing: 2px; margin-bottom: 5px; text-shadow: 0 2px 15px rgba(0,0,0,0.3); }
          .lock-date { font-size: 18px; font-weight: 400; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
          .lock-hint-container { position: absolute; bottom: 50px; display: flex; flex-direction: column; align-items: center; gap: 10px; animation: bounceUp 2s infinite; opacity: 0.9; }
          .lock-hint-icon { font-size: 32px; }
          .lock-hint-text { font-size: 13px; letter-spacing: 1px; font-weight: 500; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
          @keyframes bounceUp { 0%, 100% { transform: translateY(0); opacity: 0.7; } 50% { transform: translateY(-10px); opacity: 1; } }

          /* ===== 🌟 우측 세로형 네비게이션 ===== */
          .nav-container {
            position: fixed; top: 50%; right: 20px; left: auto; transform: translateY(-50%);
            background-color: var(--bg-nav); border-radius: 30px; padding: 15px 10px;
            display: flex; flex-direction: column; gap: 12px; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          .nav-btn { background: none; border: none; color: var(--nav-icon); cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
          .nav-btn:hover { background-color: rgba(255,255,255,0.1); color: #fff; }
          .nav-btn.active { background-color: var(--bg-point-light); color: var(--point-color); box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .nav-btn .material-symbols-rounded { font-size: 22px; }

          /* ===== 🌟 탭 스와이프 애니메이션 ===== */
          .tab-section { display: none; width: 100%; min-height: 100vh; }
          .tab-section.active { display: block; position: relative; z-index: 5; }
          .tab-section.flipping-in { display: block; position: relative; z-index: 5; }
          .tab-section.flipping-out { display: block; position: absolute; top: 0; left: 0; width: 100%; min-height: 100vh; z-index: 10; pointer-events: none; overflow: hidden; }
          .tab-section.flipping-in .main-wrapper { animation: swipeIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
          .tab-section.flipping-out .main-wrapper { animation: swipeOut 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
          @keyframes swipeOut { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-20%); opacity: 0; } }
          @keyframes swipeIn { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
          @keyframes fadeInBg { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

          /* ===== 메인 콘텐츠 영역 ===== */
          .main-wrapper { 
            width: 100%; min-height: 100vh; margin: 0; padding: 0 100px 0 0; 
            background-color: var(--bg-card); position: relative; overflow-x: hidden; box-sizing: border-box;
          }
          .main-wrapper::before {
            content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 40px;
            background: linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 40%, transparent 100%);
            z-index: 10; pointer-events: none;
          }
          [data-theme="dark"] .main-wrapper::before { background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 100%); }

          #tab-home .main-wrapper { padding: 0; background-color: var(--bg-body); }
          #tab-home .main-wrapper::before { display: none; }
          .fullscreen-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            /* 👇 여기에 첫번째 페이지(홈) 배경 이미지 주소를 넣어주세요 👇 */
            background-image: url('https://stimg.sooplive.com/NORMAL_BBS/8/10867168/73306a6d17133a899.gif');
            background-size: cover; background-position: center; background-repeat: no-repeat; z-index: 1;
          }

          .content-card { 
            max-width: 1200px; margin: 0 auto; padding: 60px 20px 80px 70px; 
            min-height: 100vh; background: transparent; box-shadow: none; border-radius: 0; box-sizing: border-box;
          }

          .section-header-out { margin-bottom: 25px; display: flex; align-items: center; gap: 8px; }
          .section-header-out h2 { font-size: 16px; font-weight: 800; color: var(--text-main); letter-spacing: 1px; }
          .section-header-out span { font-size: 12px; color: var(--text-sub); }

          /* ===== 프로필 ===== */
          .vn-profile-wrapper { background: var(--bg-card); border: 3px solid var(--point-color); border-radius: 20px; padding: 40px; box-shadow: inset 0 0 50px rgba(255,130,0,0.05), 0 10px 30px rgba(0,0,0,0.05); position: relative; overflow: hidden; margin-bottom: 30px; }
          [data-theme="dark"] .vn-profile-wrapper { box-shadow: inset 0 0 50px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.5); }
          .vn-profile-wrapper::after { content: ''; position: absolute; top:0; left:0; right:0; bottom:0; background-image: radial-gradient(var(--point-color) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.15; pointer-events: none; z-index: 1; }
          [data-theme="dark"] .vn-profile-wrapper::after { opacity: 0.05; }
          .vn-profile-inner { display: flex; flex-wrap: wrap; position: relative; z-index: 2; gap: 40px; align-items: center; }
          .vn-left-col { flex: 1; min-width: 300px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
          .vn-character-img { width: 100%; max-width: 350px; object-fit: contain; filter: drop-shadow(0 0 15px rgba(255,130,0,0.15)); }
          [data-theme="dark"] .vn-character-img { filter: drop-shadow(0 0 15px rgba(255,130,0,0.2)); }
          .vn-quote-box { background: var(--bg-body); border: 2px solid var(--point-color); border-radius: 12px; padding: 20px; position: relative; width: 100%; box-sizing: border-box; backdrop-filter: blur(5px); }
          .vn-quote-icon { position: absolute; top: -16px; left: -10px; width: 32px; height: 32px; background: var(--point-color); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 18px; font-weight: bold; border: 3px solid var(--bg-card); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .vn-quote-text { font-size: 14px; font-weight: 600; line-height: 1.6; color: var(--text-main); padding-left: 10px; border-left: 3px solid var(--point-color);}
          .vn-right-col { flex: 1; min-width: 350px; }
          .vn-header-badge { display: inline-flex; align-items: center; background: var(--bg-point-light); border: 2px solid var(--point-color); border-radius: 30px; padding: 6px 20px; color: var(--point-color); font-size: 15px; font-weight: 800; letter-spacing: 2px; margin-bottom: 20px; box-shadow: 2px 2px 0 rgba(255, 130, 0, 0.2); }
          .vn-header-badge::before, .vn-header-badge::after { content: '◈'; font-size: 10px; color: var(--point-color); margin: 0 8px; }
          .vn-name-title { font-size: 42px; font-weight: 900; color: var(--text-main); margin-bottom: 5px; }
          .vn-name-sub { font-size: 14px; font-weight: 700; color: var(--point-color); margin-bottom: 30px; letter-spacing: 1px; }
          .vn-info-row { display: flex; margin-bottom: 12px; font-size: 14px; align-items: center; }
          .vn-info-label { background: var(--bg-point-light); border: 1px solid var(--point-color); color: var(--point-color); padding: 4px 12px; border-radius: 6px; font-weight: 800; font-size: 12px; width: 85px; text-align: center; margin-right: 15px; box-shadow: 1px 1px 0 rgba(255, 130, 0, 0.2); }
          .vn-info-value { font-weight: 700; color: var(--text-main); }
          .vn-like-box { margin-top: 30px; margin-bottom: 30px; }
          .vn-like-title { font-size: 14px; font-weight: 800; color: var(--point-color); margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }
          .vn-like-icons { display: flex; gap: 10px; flex-wrap: wrap; }
          .vn-like-item { background: var(--bg-body); border: 1px solid var(--point-color); border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 6px; font-weight: 700; color: var(--point-color); font-size: 12px; box-shadow: 0 2px 5px rgba(255, 130, 0, 0.1); }

          /* 서브탭 및 배지 */
          .profile-bottom-grid { display: grid; grid-template-columns: 350px 1fr; gap: 40px; position: relative; z-index: 3; margin-bottom: 30px; }
          @media (max-width: 800px) { .profile-bottom-grid { grid-template-columns: 1fr; } }
          .recent-posts { background-color: var(--bg-point-light); border-radius: 12px; padding: 20px; height: 100%; box-sizing: border-box; }
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
          .extra-sub-section { display: none; animation: fadeIn 0.3s ease-in-out; height: 100%; }
          .extra-sub-section.active { display: block; }
          .vn-panel { background: var(--bg-card); border: 2px solid var(--point-color); border-radius: 16px; padding: 25px; }
          .vn-panel-title { font-size: 15px; font-weight: 900; color: var(--point-color); margin-bottom: 20px; border-bottom: 2px dashed rgba(255, 130, 0, 0.3); padding-bottom: 10px; display:flex; justify-content:space-between; align-items:flex-end; }
          .wiki-item { background: var(--bg-body); padding: 12px; border-radius: 8px; font-size: 13px; color: var(--text-main); line-height: 1.5; white-space: pre-wrap; word-break: break-all; }
          .badge-section { background-color: var(--bg-point-light); border-radius: 12px; padding: 20px; border: 1px dashed rgba(255,130,0,0.3); }
          .badge-section h3 { color: var(--point-color); font-size: 12px; padding-bottom: 10px; border-bottom: 1px dashed rgba(0,0,0,0.1); margin-bottom: 15px; }
          [data-theme="dark"] .badge-section h3 { border-bottom-color: rgba(255,255,255,0.2); }
          .badge-container { display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 2px; }
          .badge-item { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; min-width: 0; }
          .badge-img { width: 100%; max-width: 26px; height: auto; aspect-ratio: 1/1; object-fit: contain; }
          .badge-label { font-size: 9px; color: var(--text-sub); font-weight: 700; text-align: center; white-space: nowrap; letter-spacing: -0.5px; transform: scale(0.9); }
          .badge-line { flex: 0.5; height: 1px; background-color: var(--point-color); opacity: 0.3; margin-bottom: 12px; min-width: 3px; }

          /* ===== 공통 팝업 ===== */
          .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center; animation: fadeIn 0.2s; }
          .modal-content { background: var(--bg-card); width: 400px; max-width: 90%; border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative; }
          .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
          .modal-input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main); font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; transition: 0.2s; }
          .modal-input:focus { border-color: var(--point-color); }

          #music-popup { display: none; position: fixed; width: 320px; background-color: var(--bg-card); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 200; padding: 15px; border: 1px solid var(--border-color); }
          @keyframes popLeft { from { opacity: 0; transform: translate(20px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
          .popup-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .popup-header span { font-size: 11px; font-weight: bold; color: var(--point-color); }
          .close-btn { background: none; border: none; color: var(--text-sub); cursor: pointer; }
          .video-container { width: 100%; height: 180px; background-color: #000; border-radius: 8px; overflow: hidden; margin-bottom: 15px; }
          .music-controls { display: flex; align-items: center; gap: 10px; }
          .progress-bar { flex: 1; height: 4px; background-color: var(--bg-body); border-radius: 2px; }
          .progress-fill { width: 70%; height: 100%; background-color: var(--point-color); border-radius: 2px; }

          /* =========================================
             🌟 7. 미니게임 (사다리 & 블루델 스타일 핀볼)
             ========================================= */
          .game-sub-section { display: none; animation: fadeIn 0.3s ease-in-out; }
          .game-sub-section.active { display: block; }
          
          /* 사다리게임 */
          .ladder-setup { background: var(--bg-point-light); border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 1px dashed rgba(255,130,0,0.3); }
          .ladder-inputs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 15px; max-height: 200px; overflow-y: auto; }
          .ladder-input-box { background: var(--bg-card); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); }
          .ladder-input-box input { width: 100%; border: none; background: transparent; color: var(--text-main); font-size: 12px; outline: none; margin-bottom: 5px; font-family: inherit; }
          .ladder-input-box input:last-child { margin-bottom: 0; color: var(--point-color); font-weight: bold; }
          
          .ladder-board-container { position: relative; width: 100%; overflow-x: auto; background: var(--bg-body); border-radius: 12px; padding: 20px; box-sizing: border-box; border: 1px solid var(--border-color); }
          canvas#ladderCanvas { display: block; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
          .ladder-btn-row { display: flex; justify-content: center; gap: 5px; margin-bottom: 10px; min-width: 600px; }
          .ladder-start-btn { flex: 1; padding: 8px 0; background: var(--point-color); color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px; }
          .ladder-start-btn:hover { filter: brightness(0.9); }
          .ladder-result-row { display: flex; justify-content: center; gap: 5px; margin-top: 10px; min-width: 600px; }
          .ladder-res-box { flex: 1; padding: 8px 0; background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 6px; font-weight: bold; font-size: 12px; text-align: center; }

          /* 블루델 스타일 핀볼(Plinko) 레이아웃 */
          .pb-game-wrapper {
             display: flex; gap: 0; width: 100%; height: 600px; 
             background: #0b0c10; border-radius: 12px; overflow: hidden;
             box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 1px solid #1f2937;
          }
          
          /* 좌측 캔버스(트랙) 영역 */
          .pb-canvas-container {
             width: 250px; height: 100%; background: #111; 
             border-right: 1px solid #333; position: relative;
          }
          canvas#pinballCanvas { width: 100%; height: 100%; display: block; }
          
          /* 우측 리더보드 및 설정 영역 */
          .pb-side-panel {
             flex: 1; display: flex; flex-direction: column; position: relative;
          }
          
          /* 중앙 실시간 순위 화면 */
          .pb-leaderboard {
             flex: 1; background: radial-gradient(circle at center, #1e293b 0%, #020617 100%);
             display: flex; flex-direction: column; align-items: center; justify-content: center;
             color: #fff; padding: 20px; overflow: hidden; position: relative;
          }
          .pb-rank-title { font-size: 20px; font-weight: 900; color: rgba(255,255,255,0.2); margin-bottom: 20px; letter-spacing: 5px; }
          .pb-live-ranks { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 300px; }
          .pb-rank-item { 
             display: flex; justify-content: space-between; align-items: center; 
             background: rgba(255,255,255,0.05); padding: 10px 15px; border-radius: 8px;
             font-size: 14px; font-weight: 700; border-left: 4px solid transparent;
             animation: popIn 0.3s ease-out;
          }
          @keyframes popIn { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }

          /* 하단 컨트롤 패널 (회색) */
          .pb-controls {
             background: #737373; padding: 15px 20px;
             display: flex; gap: 20px; align-items: flex-end;
          }
          .pb-input-group { flex: 1; display: flex; flex-direction: column; gap: 5px; }
          .pb-input-group label { color: #fff; font-size: 11px; font-weight: 700; }
          .pb-input-group textarea { 
             width: 100%; height: 60px; background: #e2e8f0; border: none; 
             border-radius: 4px; padding: 8px; font-size: 12px; resize: none; font-family: inherit;
          }
          
          .pb-settings-group { display: flex; flex-direction: column; gap: 10px; width: 200px; }
          .pb-settings-row { display: flex; align-items: center; justify-content: space-between; color: #fff; font-size: 12px; font-weight: 700; }
          .pb-settings-row select { 
             background: #e2e8f0; border: none; border-radius: 4px; padding: 4px 8px; 
             font-size: 12px; font-family: inherit; outline: none; cursor: pointer; width: 130px;
          }
          .pb-start-btn { 
             background: #1e293b; color: #fff; border: none; border-radius: 6px;
             padding: 15px 25px; font-size: 16px; font-weight: 900; cursor: pointer; 
             display: flex; align-items: center; gap: 5px; transition: 0.2s;
          }
          .pb-start-btn:hover { background: #0f172a; }

          /* 공통 UI 요소 */
          .counter-box { display: flex; align-items: center; gap: 15px; }
          .counter-btn { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-color); background: var(--bg-card); font-size: 18px; cursor: pointer; color: var(--text-main); display:flex; align-items:center; justify-content:center;}
          .counter-num { font-size: 18px; font-weight: bold; color: var(--point-color); min-width: 20px; text-align: center; }
          .action-btn { background-color: var(--text-main); color: var(--bg-card); padding: 10px 25px; border-radius: 20px; border: none; font-weight: bold; cursor: pointer; font-size: 13px; transition: 0.2s; }
          .action-btn:hover { background-color: var(--point-color); }

          /* ===== VOD 다시보기 ===== */
          .vod-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
          @media (max-width: 1100px) { .vod-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 800px) { .vod-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 500px) { .vod-grid { grid-template-columns: repeat(1, 1fr); } }
          
          .vod-card { background: var(--bg-body); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; text-decoration: none; color: var(--text-main); display: flex; flex-direction: column; }
          .vod-card:hover { transform: translateY(-5px); border-color: var(--point-color); box-shadow: 0 8px 20px rgba(255,130,0,0.15); }
          .vod-card.pinned { border: 2px solid var(--point-color); box-shadow: 0 4px 12px rgba(255,130,0,0.1); }
          .vod-thumb { width: 100%; aspect-ratio: 16/9; background-color: #e2e8f0; position: relative; }
          [data-theme="dark"] .vod-thumb { background-color: #334155; }
          .vod-thumb img { width: 100%; height: 100%; object-fit: cover; }
          .vod-play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; z-index: 1; }
          .vod-play-overlay span { font-size: 50px; color: #fff; text-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: transform 0.2s, color 0.2s; }
          .vod-card:hover .vod-play-overlay { opacity: 1; }
          .vod-card:hover .vod-play-overlay span { color: var(--point-color); transform: scale(1.1); }
          .vod-info { padding: 15px; }
          .vod-title { font-size: 14px; font-weight: 800; margin-bottom: 5px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          .vod-meta-stats { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-sub); margin-top: 8px; }
          .vod-badge { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; padding: 3px 6px; border-radius: 4px; font-weight: 700; z-index: 2; }

          /* ===== 기타 탭용 공통 스타일 ===== */
          .calendar-header-new { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
          .cal-title-left h1 { font-size: 32px; font-weight: 900; margin-bottom: 10px; display:flex; align-items:center; gap:10px; }
          .cal-nav { display: flex; align-items: center; gap: 15px; }
          .nav-arrow { background: none; border: none; padding: 0; margin: 0; color: var(--text-sub); cursor: pointer; display: flex; align-items: center; transition: color 0.2s; }
          .nav-arrow:hover { color: var(--point-color); }
          #current-month-year { font-size: 15px; font-weight: 600; color: var(--text-sub); }
          #cal-month-view { display: grid; grid-template-columns: repeat(7, 1fr); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: var(--bg-card); }
          .cal-day-head { text-align: center; padding: 15px 0; font-weight: 700; font-size: 14px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.02); }
          .cal-cell { height: 120px; border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 10px; box-sizing: border-box; }
          .cal-cell.empty { background-color: transparent; }
          .cal-cell.bg-orange { background-color: var(--bg-point-light); border-left:3px solid var(--point-color);}
          .cal-cell.bg-yellow { background-color: #fff9e6; border-left:3px solid #facc15;}
          .cal-cell.bg-blue { background-color: #e6f4ff; border-left:3px solid #38bdf8;}
          .cal-cell.bg-pink { background-color: #fff0f5; border-left:3px solid #f472b6;}
          .cal-cell .date { font-weight: bold; font-size: 14px; margin-bottom: 5px; color: var(--text-main); }
          .cal-cell .sch-txt { font-size: 12px; font-weight: 600; line-height: 1.4; color: var(--text-main); margin-bottom:4px; background:rgba(255,255,255,0.6); padding:4px 6px; border-radius:4px; word-break:keep-all;}
          #cal-week-view { display: none; grid-template-columns: repeat(7, 1fr); gap: 15px; margin-top: 20px; }
          .cal-week-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 15px; min-height: 250px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
          .cal-week-date { font-size: 15px; font-weight: 800; color: var(--text-main); margin-bottom: 15px; }
          .event-pill { font-size: 11px; font-weight: 800; padding: 6px 8px; border-radius: 6px; text-align: left; word-break: keep-all; }
          
          .search-bar { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }
          .search-bar input { padding: 10px 15px; border: 1px solid var(--border-color); border-radius: 8px; width: 250px; background: transparent; color: var(--text-main); font-family:inherit;}
          .refresh-btn { background: var(--bg-body); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; cursor: pointer; color: var(--text-sub); display: flex; align-items: center; justify-content: center; transition: 0.2s; }
          .refresh-btn:hover { color: var(--point-color); border-color:var(--point-color); }
          .song-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
          .song-table th, .song-table td { padding: 15px 10px; border-bottom: 1px solid var(--border-color); text-align: left; }
          .song-table th { font-size: 13px; color: var(--text-sub); font-weight: normal; }
          .song-table td { font-size: 14px; font-weight: 600; color: var(--text-main); }
          .group-header-row td { padding: 0 !important; border: none !important; }
          .group-header-box { display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-point-light); padding: 12px 20px; border-radius: 12px; margin-top: 20px; margin-bottom: 5px; }

          .link-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
          .link-card { display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid var(--border-color); border-radius: 12px; transition: border-color 0.2s; }
          .link-card:hover { border-color: var(--point-color); }
          .link-left { display: flex; align-items: center; gap: 15px; }
          .link-icon { font-size: 24px; color: var(--point-color); }
          .link-txt h4 { margin: 0 0 3px 0; font-size: 15px; }
          .link-txt p { margin: 0; font-size: 12px; color: var(--text-sub); }
          .link-right { font-size: 11px; font-weight: bold; color: var(--point-color); }
          
          .sub-tabs { display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }
          .sub-tab-btn { padding: 8px 18px; border: 1px solid var(--border-color); background-color: var(--bg-card); color: var(--text-sub); border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s; font-family:inherit;}
          .sub-tab-btn:hover { color: var(--point-color); border-color: var(--point-color); }
          .sub-tab-btn.active { background-color: var(--point-color); color: #ffffff; border-color: var(--point-color); }
        </style>
      </head>
      <body>

        <!-- 🌟 스마트폰 잠금화면 오버레이 -->
        <div id="lock-screen" onclick="unlockScreen()">
          <div class="lock-time" id="lock-time">00:00</div>
          <div class="lock-date" id="lock-date">1월 1일 월요일</div>
          <div class="lock-hint-container">
            <span class="material-symbols-rounded lock-hint-icon">keyboard_double_arrow_up</span>
            <div class="lock-hint-text">화면을 위로 쓸어올리거나 클릭해서 잠금 해제</div>
          </div>
        </div>

        <!-- 🌟 우측 세로형 네비게이션 바 -->
        <nav class="nav-container">
          <button class="nav-btn active" onclick="switchTab('tab-home', this)" title="홈"><span class="material-symbols-rounded">home</span></button>
          <button class="nav-btn" onclick="switchTab('tab-profile', this)" title="프로필"><span class="material-symbols-rounded">person</span></button>
          <button class="nav-btn" onclick="switchTab('tab-schedule', this)" title="일정"><span class="material-symbols-rounded">calendar_today</span></button>
          <button class="nav-btn" onclick="switchTab('tab-songbook', this)" title="노래책"><span class="material-symbols-rounded">lyrics</span></button>
          <button class="nav-btn" onclick="switchTab('tab-closet', this)" title="의상실"><span class="material-symbols-rounded">checkroom</span></button>
          <button class="nav-btn" onclick="switchTab('tab-upbo', this)" title="업보리스트"><span class="material-symbols-rounded">receipt_long</span></button>
          <button class="nav-btn" onclick="switchTab('tab-game', this)" title="미니게임"><span class="material-symbols-rounded">sports_esports</span></button>
          <button class="nav-btn" onclick="switchTab('tab-vod', this)" title="VOD 다시보기"><span class="material-symbols-rounded">video_library</span></button>
          <button class="nav-btn" onclick="toggleMusicPopup(this)" title="배경음악"><span class="material-symbols-rounded">music_note</span></button>
          <button class="nav-btn" onclick="switchTab('tab-info', this)" title="정보 및 링크"><span class="material-symbols-rounded">info</span></button>
          <button class="nav-btn" onclick="toggleTheme()" id="themeToggleBtn" title="다크모드"><span class="material-symbols-rounded">dark_mode</span></button>
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
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLQsBVkS90xTY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="music-controls">
            <span class="material-symbols-rounded" style="font-size:16px;">volume_up</span>
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <span style="font-size:11px; font-weight:bold;">70%</span>
          </div>
        </div>

        <!-- 송현위키 팝업 -->
        <div id="wiki-popup" class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <div style="font-size:15px; font-weight:800; color:var(--text-main); display:flex; align-items:center; gap:6px;">
                <span class="material-symbols-rounded" style="color:var(--point-color);">edit_document</span> 위키 새 문서 작성
              </div>
              <div style="display:flex; gap:8px;">
                <button onclick="saveWiki()" style="background:var(--point-color); color:#fff; border:none; border-radius:6px; padding:6px 14px; font-weight:bold; font-size:12px; cursor:pointer;">저장</button>
                <button onclick="closeWikiPopup()" style="background:var(--bg-body); color:var(--text-sub); border:1px solid var(--border-color); border-radius:6px; padding:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                  <span class="material-symbols-rounded" style="font-size:16px;">close</span>
                </button>
              </div>
            </div>
            <textarea id="wiki-textarea" class="modal-input" style="height:200px; resize:none;" placeholder="송현위키에 추가할 새로운 내용을 적어주세요."></textarea>
          </div>
        </div>

        <!-- 🌟 일정 추가 팝업 -->
        <div id="schedule-popup" class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <div style="font-size:15px; font-weight:800; color:var(--text-main); display:flex; align-items:center; gap:6px;">
                <span class="material-symbols-rounded" style="color:var(--point-color);">calendar_add_on</span> 새 일정 추가
              </div>
              <div style="display:flex; gap:8px;">
                <button onclick="saveSchedule()" style="background:var(--point-color); color:#fff; border:none; border-radius:6px; padding:6px 14px; font-weight:bold; font-size:12px; cursor:pointer;">저장</button>
                <button onclick="closeSchedulePopup()" style="background:var(--bg-body); color:var(--text-sub); border:1px solid var(--border-color); border-radius:6px; padding:6px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                  <span class="material-symbols-rounded" style="font-size:16px;">close</span>
                </button>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; gap:10px;">
                <div style="flex:1;">
                  <div style="font-size:11px; color:var(--text-sub); margin-bottom:4px;">날짜지정 (필수)</div>
                  <input type="date" id="sch-date" class="modal-input">
                </div>
                <div style="flex:1;">
                  <div style="font-size:11px; color:var(--text-sub); margin-bottom:4px;">시간입력 (선택)</div>
                  <input type="time" id="sch-time" class="modal-input">
                </div>
              </div>
              <div>
                <div style="font-size:11px; color:var(--text-sub); margin-bottom:4px;">색상지정</div>
                <select id="sch-color" class="modal-input">
                  <option value="orange">주황색 (기본)</option>
                  <option value="blue">파란색</option>
                  <option value="pink">분홍색</option>
                  <option value="yellow">노란색</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px; color:var(--text-sub); margin-bottom:4px;">제목 (필수)</div>
                <input type="text" id="sch-title" class="modal-input" placeholder="일정 제목을 적어주세요">
              </div>
              <div>
                <div style="font-size:11px; color:var(--text-sub); margin-bottom:4px;">내용입력 (선택)</div>
                <textarea id="sch-desc" class="modal-input" placeholder="상세 내용 입력..." style="height:80px; resize:none;"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 1. 홈 탭 -->
        <section id="tab-home" class="tab-section active">
          <div class="main-wrapper">
            <div class="fullscreen-bg"></div>
          </div>
        </section>

        <!-- 2. 프로필 탭 -->
        <section id="tab-profile" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>Profile</h2><span>/ 프로필</span></div>
              
              <div class="vn-profile-wrapper">
                <div class="vn-profile-inner">
                  <div class="vn-left-col">
                    <img src="여기에_프로필_이미지_주소를_넣어주세요.png" class="vn-character-img" alt="캐릭터 스탠딩">
                    <div class="vn-quote-box">
                      <div class="vn-quote-icon"><span class="material-symbols-rounded" style="font-size: 16px;">format_quote</span></div>
                      <div class="vn-quote-text">"반가워요! 송현입니다.<br>오늘 방송도 함께해 주셔서 감사합니다!"</div>
                    </div>
                  </div>

                  <div class="vn-right-col">
                    <div class="vn-header-badge">스트리머 소개</div>
                    <div class="vn-name-title">송현</div>
                    <div class="vn-name-sub">Song Hyun | Virtual Streamer</div>

                    <div class="vn-info-row"><div class="vn-info-label">AGE</div><div class="vn-info-value">17</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">DEBUT</div><div class="vn-info-value">2024.02</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">BIRTHDAY</div><div class="vn-info-value">06.08</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">FAN NAME</div><div class="vn-info-value">황숭이</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">MBTI</div><div class="vn-info-value">ISTP</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">특이사항</div><div class="vn-info-value">짱구</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">방송 시간</div><div class="vn-info-value">오후 6시 ~ 오전 12시</div></div>
                    <div class="vn-info-row"><div class="vn-info-label">팬닉</div><div class="vn-info-value">OOOⓖ</div></div>

                    <div class="vn-like-box">
                      <div class="vn-like-title"><span class="material-symbols-rounded" style="font-size:16px;">favorite</span> LIKE</div>
                      <div class="vn-like-icons">
                        <div class="vn-like-item"><span class="material-symbols-rounded">music_note</span> 노래</div>
                        <div class="vn-like-item"><span class="material-symbols-rounded">tv</span> 애니메이션</div>
                        <div class="vn-like-item"><span class="material-symbols-rounded">ramen_dining</span> 국물 면요리</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="profile-bottom-grid">
                <div>
                  <div class="recent-posts" style="margin-top:0;">
                    <div class="recent-posts-header">
                      <div>
                        <div style="font-size: 10px; font-weight: 800; color: var(--point-color);">SOOP POSTS</div>
                        <h3 style="font-size: 16px; font-weight: 800; margin-top: 2px;">최근 게시글</h3>
                      </div>
                      <a href="https://bj.afreecatv.com/songhy/posts" target="_blank" class="recent-posts-more">전체보기 ↗</a>
                    </div>
                    <div id="soop-posts-container" class="recent-posts-list"></div>
                  </div>
                </div>

                <div class="extra-tabs-area">
                  <div class="sub-tabs" style="margin-bottom: 15px;">
                    <button class="sub-tab-btn active" onclick="switchExtraTab('extra-rule', this)">방송규칙</button>
                    <button class="sub-tab-btn" onclick="switchExtraTab('extra-ogq', this)">OGQ MARKET</button>
                    <button class="sub-tab-btn" onclick="switchExtraTab('extra-wiki', this)">송현위키</button>
                  </div>
                  
                  <div id="extra-rule" class="extra-sub-section active">
                    <div class="vn-panel" style="margin-bottom:0; height: 180px; overflow-y: auto;">
                      <div class="vn-panel-title">
                        <div><span class="material-symbols-rounded" style="font-size:16px; margin-right:5px; vertical-align:text-bottom;">gavel</span>방송 규칙</div>
                      </div>
                      <ul style="font-size:13px; color:var(--text-main); line-height:1.6; padding-left:20px; margin:0;">
                        <li style="margin-bottom:6px;">타 스트리머 관련 언급 금지</li>
                        <li style="margin-bottom:6px;">시청자 간의 과도한 친목 금지</li>
                        <li style="margin-bottom:6px;">게임 스포일러 및 선 넘는 훈수 금지</li>
                        <li style="margin-bottom:6px;">욕설, 도배, 어그로성 채팅은 즉시 밴 처리됩니다.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div id="extra-ogq" class="extra-sub-section">
                    <div class="vn-panel" style="margin-bottom:0; height: 180px; display:flex; align-items:center; justify-content:center; gap: 40px; text-align:center;">
                      <a href="https://naver.me/GDQWC7ZK" target="_blank" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <img src="https://stimg.sooplive.com/NORMAL_BBS/8/10867168/14251786949404893.png" alt="황숭티콘 1" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <span style="font-size:15px; font-weight:800; color:var(--text-main);">황숭티콘(SOOP)</span>
                      </a>
                      <a href="두번째_OGQ_링크_주소를_넣어주세요" target="_blank" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        <img src="https://stimg.sooplive.com/NORMAL_BBS/8/10867168/50741786949410199.png" alt="황숭티콘 2" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <span style="font-size:15px; font-weight:800; color:var(--text-main);">황숭티콘(Naver)</span>
                      </a>
                    </div>
                  </div>
                  
                  <div id="extra-wiki" class="extra-sub-section">
                    <div class="vn-panel" style="margin-bottom:0; height: 180px; display:flex; flex-direction:column; padding:15px 25px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed rgba(0,0,0,0.1); padding-bottom:10px; margin-bottom:10px;">
                        <h3 style="margin:0; border:none; padding:0; display:flex; align-items:center; gap:5px; color:var(--point-color); font-size:14px;">
                          <span class="material-symbols-rounded" style="font-size:16px;">menu_book</span> 송현위키 
                        </h3>
                        <button onclick="openWikiPopup()" title="새 내용 작성" style="background:var(--point-color); color:#fff; border:none; border-radius:50%; width:26px; height:26px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 5px rgba(255,130,0,0.3); transition:0.2s;">
                          <span class="material-symbols-rounded" style="font-size:18px;">add</span>
                        </button>
                      </div>
                      <div id="wiki-content-list" style="overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:10px; padding-right:5px;">
                        <div class="wiki-item"><strong>[환영합니다]</strong> 송현위키에 오신 것을 환영합니다! 우측 상단의 <strong>+ 버튼</strong>을 눌러 나만이 알고 있는 송현님의 정보를 추가해 보세요!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 하단 맨 끝: 구독 뱃지 영역 -->
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
                  <div class="badge-line"></div>
                  <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/376367750e90e348c.png?_=1735785621" class="badge-img" alt="36개월"><span class="badge-label">36개월</span></div>
                  <div class="badge-line"></div>
                  <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/619967750e9c129f8.png?_=1735785312" class="badge-img" alt="48개월"><span class="badge-label">48개월</span></div>
                  <div class="badge-line"></div>
                  <div class="badge-item"><img src="https://static.file.sooplive.com/spcon/532367750f27010e1.png?_=1735785295" class="badge-img" alt="60개월"><span class="badge-label">60개월</span></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 3. 일정표 탭 -->
        <section id="tab-schedule" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>SCHEDULE</h2><span>/ 일정</span></div>
              
              <div class="calendar-header-new" style="margin-bottom: 15px;">
                <div class="cal-title-left">
                  <h1 style="margin-bottom: 10px; display:flex; align-items:center; gap:10px;">
                    SCHEDULE
                    <button onclick="openSchedulePopup()" title="새 일정 추가" style="background:var(--point-color); color:#fff; border:none; border-radius:50%; width:28px; height:28px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 5px rgba(255,130,0,0.3); transition:0.2s; margin-bottom: 4px;">
                      <span class="material-symbols-rounded" style="font-size:20px;">add</span>
                    </button>
                  </h1>
                  <div class="cal-nav">
                    <button class="nav-arrow" onclick="changeDate(-1)"><span class="material-symbols-rounded">chevron_left</span></button>
                    <span id="current-month-year">2026년 8월</span>
                    <button class="nav-arrow" onclick="changeDate(1)"><span class="material-symbols-rounded">chevron_right</span></button>
                  </div>
                </div>
              </div>
              
              <div style="display:flex; justify-content:flex-end; margin-bottom: 8px;">
                <div class="sub-tabs" style="margin-bottom:0; gap:8px;">
                  <button class="sub-tab-btn" id="btn-week" onclick="toggleCalendarView('week')">주간</button>
                  <button class="sub-tab-btn active" id="btn-month" onclick="toggleCalendarView('month')">월간</button>
                </div>
              </div>

              <div id="cal-month-view"></div>
              <div id="cal-week-view"></div>
            </div>
          </div>
        </section>

        <!-- 4. 노래책 탭 -->
        <section id="tab-songbook" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>SONG BOOK ♫</h2><span>/ 노래책</span></div>
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

        <!-- 5. 의상실 탭 -->
        <section id="tab-closet" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>CLOSET</h2><span>/ 의상 리스트</span></div>
              <div style="margin-bottom: 20px;">
                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 6px;">CLOSET</h1>
                <p style="font-size: 13px; color: var(--text-sub);">의상을 누르면 전체 이미지와 ON/OFF 가능한 부위를 볼 수 있어요.</p>
              </div>

              <div class="sub-tabs">
                <button class="sub-tab-btn active" onclick="switchClosetTab('closet-default', this)">기본의상</button>
                <button class="sub-tab-btn" onclick="switchClosetTab('closet-event', this)">이벤트의상</button>
                <button class="sub-tab-btn" onclick="switchClosetTab('closet-hair', this)">헤어</button>
              </div>

              <div id="closet-default" class="closet-sub-section active">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_기본의상_이미지_주소.jpg');">
                    <span class="closet-tag-name">스텔라</span><span class="closet-tag-badge">NEW</span>
                    <div class="closet-card-bottom"><span class="closet-bottom-btn">기본의상</span><div class="closet-bottom-icons"><span>+6</span><span class="material-symbols-rounded" style="font-size: 16px;">visibility</span></div></div>
                  </div>
                </div>
              </div>

              <div id="closet-event" class="closet-sub-section">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_이벤트의상_이미지_주소.jpg');">
                    <span class="closet-tag-name">파티 드레스</span>
                    <div class="closet-card-bottom"><span class="closet-bottom-btn">이벤트의상</span><div class="closet-bottom-icons"><span class="material-symbols-rounded" style="font-size: 16px;">visibility</span></div></div>
                  </div>
                </div>
              </div>

              <div id="closet-hair" class="closet-sub-section">
                <div class="closet-card-grid">
                  <div class="closet-item-card" style="background-image: url('여기에_헤어_이미지_주소.jpg');">
                    <span class="closet-tag-name">단발 펌</span>
                    <div class="closet-card-bottom"><span class="closet-bottom-btn">헤어</span><div class="closet-bottom-icons"><span class="material-symbols-rounded" style="font-size: 16px;">visibility</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. 업보 탭 -->
        <section id="tab-upbo" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>업보 ♡</h2><span>/ 리스트</span></div>
              <p style="font-size:14px; color:var(--text-sub);">시청자 카드를 누르면 어떤 업보가 있는지 자세히 볼 수 있어요.</p>
              <div class="empty-state">등록된 업보가 없습니다.</div>
            </div>
          </div>
        </section>

        <!-- 🌟 7. 미니게임 탭 (사다리게임 & 블루델스타일 핀볼게임 완벽 구현) -->
        <section id="tab-game" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>MINI GAME</h2><span>/ 미니게임</span></div>
              
              <div class="sub-tabs" style="margin-bottom:20px;">
                <button class="sub-tab-btn active" onclick="switchGameTab('game-ladder', this)">사다리게임</button>
                <button class="sub-tab-btn" onclick="switchGameTab('game-pinball', this)">핀볼 뽑기 (Plinko)</button>
              </div>

              <!-- 🎮 사다리게임 영역 -->
              <div id="game-ladder" class="game-sub-section active">
                <div class="ladder-setup">
                  <div style="font-weight:800; font-size:15px; margin-bottom:10px; color:var(--point-color);">1. 참가 인원 설정 (최대 16명)</div>
                  <div class="counter-box">
                    <button class="counter-btn" onclick="changeLadderCount(-1)">-</button>
                    <div class="counter-num" id="ladder-count">4</div>
                    <button class="counter-btn" onclick="changeLadderCount(1)">+</button>
                  </div>
                  <div class="ladder-inputs-grid" id="ladder-inputs-container">
                    <!-- JS로 동적 생성됨 -->
                  </div>
                  <button class="action-btn" style="margin-top:15px;" onclick="generateLadder()">사다리 무작위 생성하기</button>
                </div>
                
                <div id="ladder-play-area" style="display:none; animation:fadeIn 0.3s;">
                  <div style="font-size:13px; color:var(--text-sub); margin-bottom:10px;">시작 버튼(참가자 이름)을 누르면 결과로 이동합니다!</div>
                  <div class="ladder-board-container" id="ladder-board-wrap">
                    <div class="ladder-btn-row" id="ladder-btns"></div>
                    <canvas id="ladderCanvas" height="400"></canvas>
                    <div class="ladder-result-row" id="ladder-results"></div>
                  </div>
                </div>
              </div>

              <!-- 🎮 블루델 스타일 핀볼게임 영역 -->
              <div id="game-pinball" class="game-sub-section">
                <div class="pb-game-wrapper">
                  
                  <!-- 좌측 캔버스 (트랙) 영역 -->
                  <div class="pb-canvas-container">
                    <canvas id="pinballCanvas"></canvas>
                  </div>

                  <!-- 우측 컨트롤 및 리더보드 영역 -->
                  <div class="pb-side-panel">
                    
                    <!-- 실시간 랭킹 디스플레이 -->
                    <div class="pb-leaderboard" id="pb-leaderboard">
                      <div class="pb-rank-title">LIVE RANKING</div>
                      <div class="pb-live-ranks" id="pb-live-ranks">
                        <!-- JS에서 실시간 순위 채워짐 -->
                        <div style="color:rgba(255,255,255,0.3); font-size:13px;">아래에서 참가자와 보상을 입력 후<br>추첨을 시작해주세요!</div>
                      </div>
                    </div>

                    <!-- 하단 컨트롤 영역 -->
                    <div class="pb-controls">
                      <div class="pb-input-group">
                        <label>이름들을 입력하세요 (예: 수박*2, 키위*1)</label>
                        <textarea id="pb-participants">수박*2, 키위*2, 귤*2</textarea>
                      </div>
                      <div class="pb-input-group">
                        <label>당첨 보상 목록 (엔터로 구분)</label>
                        <textarea id="pb-rewards">꽝\n노래 1곡\n꽝\n리액션\n꽝</textarea>
                      </div>
                      <div class="pb-settings-group">
                        <div class="pb-settings-row">
                          <span>🗺️ 맵 종류</span>
                          <select id="pb-map-select">
                            <option value="map1">운명의 수레바퀴</option>
                            <option value="map2">지그재그 협곡</option>
                            <option value="map3">블랙홀</option>
                            <option value="map4">회전 교차로</option>
                            <option value="map5">벽타기</option>
                            <option value="map6">카오스</option>
                          </select>
                        </div>
                        <button class="pb-start-btn" onclick="startPinballGame()">
                          <span class="material-symbols-rounded">play_arrow</span> 추첨 시작
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 🌟 8. VOD 탭 (카테고리 탭 완벽 적용) -->
        <section id="tab-vod" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>VOD ARCHIVE</h2><span>/ 노래 다시보기</span></div>
              <div style="margin-bottom: 20px;">
                <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 6px;">SOOP VOD</h1>
                <p style="font-size: 13px; color: var(--text-sub);">SOOP에 올라온 노래 다시보기 영상들을 정리해 두었어요. 카드를 누르면 새 창으로 이동해 바로 재생됩니다!</p>
              </div>
              
              <div class="search-bar" style="margin-bottom: 20px;">
                <input type="text" id="vod-search-input" onkeyup="filterVods()" placeholder="다시보기 영상 제목을 검색해보세요...">
                <button class="refresh-btn" onclick="document.getElementById('vod-search-input').value=''; filterVods();" title="검색 초기화"><span class="material-symbols-rounded" style="font-size:18px;">refresh</span></button>
              </div>

              <!-- VOD 카테고리 필터 탭 -->
              <div class="sub-tabs" id="vod-category-tabs" style="margin-bottom: 25px;">
                <button class="sub-tab-btn active" onclick="filterVodsByCategory('all', this)">전체 동영상</button>
                <button class="sub-tab-btn" onclick="filterVodsByCategory('live', this)">라이브</button>
                <button class="sub-tab-btn" onclick="filterVodsByCategory('cover', this)">노래커버</button>
              </div>

              <div id="vod-grid-container" class="vod-grid">
                <div style="text-align:center; padding: 50px; color: var(--text-sub); grid-column: 1 / -1;">
                  <span class="material-symbols-rounded" style="font-size:40px; animation: spin 2s linear infinite;">sync</span><br><br>
                  VOD 목록을 불러오는 중입니다...
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 9. INFO 탭 -->
        <section id="tab-info" class="tab-section">
          <div class="main-wrapper">
            <div class="content-card">
              <div class="section-header-out"><h2>Song Hyun Links</h2><span>/ INFO / LINKS</span></div>
              <p style="font-size:14px; color:var(--text-sub);">Official contact, character credit and community links.</p>
              <div class="link-grid">
                <a href="#" class="link-card">
                  <div class="link-left"><span class="material-symbols-rounded link-icon" style="color:#03C75A;">mail</span><div class="link-txt"><h4>Contact Email</h4><p>songhy___@naver.com</p></div></div>
                  <div class="link-right">MAIL ↗</div>
                </a>
                <a href="https://www.sooplive.com/station/songhy" class="link-card">
                  <div class="link-left"><img src="https://res.sooplive.com/images/svg/soop_logo.svg" style="width:24px; height:24px; object-fit:contain; margin-right:5px;" alt="SOOP"><div class="link-txt"><h4>Official Broadcasting</h4><p>SOOP 방송국</p></div></div>
                  <div class="link-right">BROADCAST ↗</div>
                </a>
                <a href="https://www.youtube.com/@songhy___/featured" target="_blank" class="link-card">
                  <div class="link-left"><span class="material-symbols-rounded link-icon" style="color:#FF0000;">smart_display</span><div class="link-txt"><h4>YouTube</h4><p>Song Hyun Channel</p></div></div>
                  <div class="link-right">VIDEO ↗</div>
                </a>
                <a href="https://cafe.naver.com/songhysonghy" target="_blank" class="link-card">
                  <div class="link-left"><span class="material-symbols-rounded link-icon" style="color:#03C75A;">coffee</span><div class="link-txt"><h4>COMMUNITY</h4><p>황숭이 수용소</p></div></div>
                  <div class="link-right">CAFE ↗</div>
                </a>
                <a href="https://fancim.me/celeb/profile.aspx?cu_id=iM+/awzH7YMmAi0xh2mppg==" target="_blank" class="link-card">
                  <div class="link-left"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywUtO7pfrtYaRIu5gWF82EkhKgZPQ2lZ2TJ8iCY6dImZnyBbdMI0GfQM&s=10" style="width:24px; height:24px; object-fit:contain; margin-right:5px;" alt="Fansim"><div class="link-txt"><h4>Fansim</h4><p>sending gift</p></div></div>
                  <div class="link-right">LINK ↗</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- 기능 스크립트 모음 -->
        <script>
          /* ===== 🌟 잠금화면 ===== */
          function unlockScreen() {
            var lock = document.getElementById('lock-screen');
            if(lock) {
              lock.classList.add('unlocked');
              setTimeout(function() { lock.style.display = 'none'; }, 600); 
            }
          }

          function updateLockTime() {
            const now = new Date();
            let h = now.getHours(); let m = now.getMinutes();
            h = h < 10 ? '0' + h : h; m = m < 10 ? '0' + m : m;
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            const dateStr = (now.getMonth() + 1) + '월 ' + now.getDate() + '일 ' + days[now.getDay()] + '요일';
            const timeEl = document.getElementById('lock-time');
            const dateEl = document.getElementById('lock-date');
            if (timeEl) timeEl.innerText = h + ':' + m;
            if (dateEl) dateEl.innerText = dateStr;
          }

          /* ===== 🌟 탭 스와이프 애니메이션 ===== */
          function switchTab(tabId, clickedBtn) {
            var currentTab = document.querySelector('.tab-section.active') || document.querySelector('.tab-section.flipping-in');
            var newTab = document.getElementById(tabId);
            if (currentTab === newTab) return;
            
            document.querySelectorAll('.nav-btn').forEach(function(btn) {
              if(btn.innerHTML.indexOf('music_note') === -1 && btn.innerHTML.indexOf('mode') === -1) { btn.classList.remove('active'); }
            });
            if(clickedBtn) clickedBtn.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (currentTab) {
              currentTab.classList.remove('active', 'flipping-in');
              currentTab.classList.add('flipping-out');
              newTab.classList.add('flipping-in');
              
              setTimeout(function() {
                currentTab.classList.remove('flipping-out');
                if(newTab.classList.contains('flipping-in')) {
                  newTab.classList.remove('flipping-in');
                  newTab.classList.add('active');
                  
                  if(tabId === 'tab-game') {
                     if(document.getElementById('game-ladder').classList.contains('active')) generateLadder();
                     if(document.getElementById('game-pinball').classList.contains('active')) initPinballBoard();
                  }
                }
              }, 400); 
            } else {
              newTab.classList.add('active');
            }
          }

          function switchExtraTab(subTabId, clickedBtn) {
            document.querySelectorAll('.extra-sub-section').forEach(function(sec) { sec.style.display = 'none'; });
            var parentTabs = clickedBtn.parentElement.querySelectorAll('.sub-tab-btn');
            parentTabs.forEach(function(btn) { btn.classList.remove('active'); });
            document.getElementById(subTabId).style.display = 'block';
            clickedBtn.classList.add('active');
          }

          function switchClosetTab(subTabId, clickedBtn) {
            document.querySelectorAll('.closet-sub-section').forEach(function(sec) { sec.classList.remove('active'); });
            var parentTabs = clickedBtn.parentElement.querySelectorAll('.sub-tab-btn');
            parentTabs.forEach(function(btn) { btn.classList.remove('active'); });
            document.getElementById(subTabId).classList.add('active');
            clickedBtn.classList.add('active');
          }

          function switchGameTab(subTabId, clickedBtn) {
            document.querySelectorAll('.game-sub-section').forEach(function(sec) { sec.classList.remove('active'); });
            var parentTabs = clickedBtn.parentElement.querySelectorAll('.sub-tab-btn');
            parentTabs.forEach(function(btn) { btn.classList.remove('active'); });
            document.getElementById(subTabId).classList.add('active');
            clickedBtn.classList.add('active');
            
            if(subTabId === 'game-ladder') { generateLadder(); }
            if(subTabId === 'game-pinball') { initPinballBoard(); }
          }

          function toggleTheme() {
            const htmlTag = document.documentElement;
            const themeIcon = document.querySelector('#themeToggleBtn .material-symbols-rounded');
            if (htmlTag.getAttribute('data-theme') === 'light') {
              htmlTag.setAttribute('data-theme', 'dark'); themeIcon.textContent = 'light_mode'; 
            } else {
              htmlTag.setAttribute('data-theme', 'light'); themeIcon.textContent = 'dark_mode'; 
            }
          }

          function toggleMusicPopup(btnElement) {
            const popup = document.getElementById('music-popup');
            if (popup.style.display === 'block') { popup.style.display = 'none'; } 
            else {
              popup.style.display = 'block';
              if(btnElement) {
                const rect = btnElement.getBoundingClientRect();
                popup.style.top = (rect.top + rect.height / 2) + 'px';
                popup.style.right = (window.innerWidth - rect.left + 15) + 'px';
                popup.style.left = 'auto'; popup.style.transform = 'translateY(-50%)';
                popup.style.animation = 'popLeft 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              }
            }
          }

          /* ===== 🌟 일정표 팝업 로직 ===== */
          function openSchedulePopup() {
            document.getElementById('sch-date').value = ''; document.getElementById('sch-time').value = '';
            document.getElementById('sch-title').value = ''; document.getElementById('sch-desc').value = '';
            document.getElementById('sch-color').value = 'orange';
            document.getElementById('schedule-popup').style.display = 'flex';
          }
          function closeSchedulePopup() { document.getElementById('schedule-popup').style.display = 'none'; }
          function saveSchedule() {
            var dateVal = document.getElementById('sch-date').value;
            var timeVal = document.getElementById('sch-time').value;
            var colorVal = document.getElementById('sch-color').value;
            var titleVal = document.getElementById('sch-title').value.trim();
            if(!dateVal || !titleVal) { alert('날짜와 일정 제목은 필수로 입력해주세요!'); return; }
            var d = new Date(dateVal);
            var dateKey = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            if(!mockEvents[dateKey]) mockEvents[dateKey] = [];
            var displayStr = titleVal;
            if(timeVal) displayStr = timeVal + ' ' + titleVal;
            mockEvents[dateKey].push({ text: displayStr, color: colorVal });
            renderCalendar(); 
            closeSchedulePopup();
          }

          let currentDate = new Date(); let calView = 'month'; const mockEvents = {}; 
          function renderCalendar() {
            const year = currentDate.getFullYear(); const month = currentDate.getMonth(); 
            if(calView === 'month') { document.getElementById('current-month-year').innerText = year + '년 ' + (month + 1) + '월'; }
            else {
              const tempDate = new Date(currentDate); tempDate.setDate(currentDate.getDate() - currentDate.getDay());
              document.getElementById('current-month-year').innerText = tempDate.getFullYear() + '년 ' + (tempDate.getMonth() + 1) + '월 (주간)';
            }
            if (calView === 'month') {
              document.getElementById('cal-month-view').style.display = 'grid'; document.getElementById('cal-week-view').style.display = 'none';
              renderMonth(year, month);
            } else {
              document.getElementById('cal-month-view').style.display = 'none'; document.getElementById('cal-week-view').style.display = 'grid';
              renderWeek(currentDate);
            }
          }
          function renderMonth(year, month) {
            const grid = document.getElementById('cal-month-view');
            grid.innerHTML = '<div class="cal-day-head">일</div><div class="cal-day-head">월</div><div class="cal-day-head">화</div><div class="cal-day-head">수</div><div class="cal-day-head">목</div><div class="cal-day-head">금</div><div class="cal-day-head">토</div>';
            const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); 
            const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
            for (let i = 0; i < totalCells; i++) {
              if (i < firstDay || i >= firstDay + daysInMonth) { grid.innerHTML += '<div class="cal-cell empty"></div>'; }
              else {
                const dateNum = i - firstDay + 1; const dateKey = year + '-' + (month + 1) + '-' + dateNum;
                const dayEvents = mockEvents[dateKey] || [];
                let eventHtml = ''; let bgClass = ''; 
                dayEvents.forEach(function(ev) { eventHtml += '<div class="sch-txt">' + ev.text + '</div>'; if(!bgClass) bgClass = 'bg-' + ev.color; });
                grid.innerHTML += '<div class="cal-cell ' + bgClass + '"><div class="date">' + dateNum + '</div>' + eventHtml + '</div>';
              }
            }
          }
          function renderWeek(date) {
            const grid = document.getElementById('cal-week-view'); grid.innerHTML = '';
            const startOfWeek = new Date(date); startOfWeek.setDate(date.getDate() - date.getDay());
            const daysArr = ['일', '월', '화', '수', '목', '금', '토'];
            for (let i = 0; i < 7; i++) {
              const curr = new Date(startOfWeek); curr.setDate(startOfWeek.getDate() + i);
              const y = curr.getFullYear(); const m = curr.getMonth() + 1; const d = curr.getDate(); const dateKey = y + '-' + m + '-' + d;
              const dayEvents = mockEvents[dateKey] || []; let eventHtml = '';
              dayEvents.forEach(function(ev) { eventHtml += '<div class="event-pill pill-' + ev.color + '">' + ev.text + '</div>'; });
              grid.innerHTML += '<div class="cal-week-card"><div class="cal-week-date">' + m + '/' + d + ' ' + daysArr[i] + '</div>' + eventHtml + '</div>';
            }
          }
          function changeDate(dir) {
            if (calView === 'month') { currentDate.setMonth(currentDate.getMonth() + dir); }
            else { currentDate.setDate(currentDate.getDate() + (dir * 7)); } renderCalendar();
          }
          function toggleCalendarView(view) {
            calView = view;
            document.getElementById('btn-month').classList.remove('active'); document.getElementById('btn-week').classList.remove('active');
            document.getElementById('btn-' + view).classList.add('active'); renderCalendar();
          }

          /* ===== 🌟 사다리게임 ===== */
          let ladderCount = 4; let rungs = []; let ctxL, canvasL;

          function changeLadderCount(val) {
            ladderCount += val;
            if (ladderCount < 2) ladderCount = 2;
            if (ladderCount > 16) ladderCount = 16;
            document.getElementById('ladder-count').innerText = ladderCount;
            renderLadderInputs();
          }
          function renderLadderInputs() {
            const container = document.getElementById('ladder-inputs-container'); let html = '';
            for(let i=0; i<ladderCount; i++) {
               html += '<div class="ladder-input-box"><input type="text" id="ladder-name-'+i+'" value="참가자 '+(i+1)+'"><input type="text" id="ladder-res-'+i+'" value="결과 '+(i+1)+'"></div>';
            }
            container.innerHTML = html;
          }
          function generateLadder() {
            document.getElementById('ladder-play-area').style.display = 'block';
            const btnWrap = document.getElementById('ladder-btns'); const resWrap = document.getElementById('ladder-results');
            canvasL = document.getElementById('ladderCanvas'); ctxL = canvasL.getContext('2d');
            const cw = Math.max(600, ladderCount * 80);
            canvasL.width = cw; btnWrap.style.minWidth = cw + 'px'; resWrap.style.minWidth = cw + 'px';
            
            let btnHtml = ''; let resHtml = '';
            for(let i=0; i<ladderCount; i++) {
              let pName = document.getElementById('ladder-name-'+i).value || (i+1); let pRes = document.getElementById('ladder-res-'+i).value || '?';
              btnHtml += '<button class="ladder-start-btn" onclick="playLadder('+i+')">' + pName + '</button>';
              resHtml += '<div class="ladder-res-box" id="res-box-'+i+'">' + pRes + '</div>';
            }
            btnWrap.innerHTML = btnHtml; resWrap.innerHTML = resHtml;

            const floors = 10 + Math.floor(Math.random() * 5); 
            rungs = [];
            for(let f=1; f<=floors; f++) {
               let placed = [];
               for(let c=0; c<ladderCount-1; c++) {
                  if(Math.random() < 0.35 && !placed.includes(c-1)) { rungs.push({ row: f, col: c }); placed.push(c); }
               }
            }
            drawLadderBase();
          }
          function drawLadderBase() {
             ctxL.clearRect(0, 0, canvasL.width, canvasL.height);
             const colWidth = canvasL.width / ladderCount;
             ctxL.lineWidth = 4; ctxL.lineCap = 'round'; ctxL.strokeStyle = 'rgba(150, 150, 150, 0.3)';
             for(let i=0; i<ladderCount; i++) {
                let x = colWidth/2 + (i*colWidth);
                ctxL.beginPath(); ctxL.moveTo(x, 0); ctxL.lineTo(x, canvasL.height); ctxL.stroke();
             }
             const rowHeight = canvasL.height / 15; 
             rungs.forEach(rung => {
                let y = rung.row * rowHeight; let x1 = colWidth/2 + (rung.col * colWidth); let x2 = colWidth/2 + ((rung.col+1) * colWidth);
                ctxL.beginPath(); ctxL.moveTo(x1, y); ctxL.lineTo(x2, y); ctxL.stroke();
             });
          }
          function playLadder(startIndex) {
             drawLadderBase();
             const colWidth = canvasL.width / ladderCount; const rowHeight = canvasL.height / 15;
             let path = [{ x: colWidth/2 + (startIndex*colWidth), y: 0 }]; let currentCol = startIndex;

             for(let f=1; f<=15; f++) {
                let y = f * rowHeight;
                path.push({ x: colWidth/2 + (currentCol*colWidth), y: y });
                let rToRight = rungs.find(r => r.row === f && r.col === currentCol);
                let rToLeft = rungs.find(r => r.row === f && r.col === currentCol - 1);
                
                if (rToRight) { currentCol++; path.push({ x: colWidth/2 + (currentCol*colWidth), y: y }); } 
                else if (rToLeft) { currentCol--; path.push({ x: colWidth/2 + (currentCol*colWidth), y: y }); }
             }

             let step = 0; let progress = 0;
             ctxL.lineWidth = 5; ctxL.strokeStyle = '#ff8200';

             function animate() {
                if (step >= path.length - 1) {
                   document.querySelectorAll('.ladder-res-box').forEach(el => { el.style.background = 'var(--bg-card)'; el.style.color = 'var(--text-main)'; });
                   const finalBox = document.getElementById('res-box-'+currentCol);
                   finalBox.style.background = '#ff8200'; finalBox.style.color = '#fff';
                   return;
                }
                let p1 = path[step]; let p2 = path[step+1];
                progress += 0.15; if(progress > 1) { progress = 1; }
                let currX = p1.x + (p2.x - p1.x) * progress; let currY = p1.y + (p2.y - p1.y) * progress;

                drawLadderBase(); 
                ctxL.beginPath(); ctxL.moveTo(path[0].x, path[0].y);
                for(let i=1; i<=step; i++) { ctxL.lineTo(path[i].x, path[i].y); }
                ctxL.lineTo(currX, currY); ctxL.stroke();
                ctxL.beginPath(); ctxL.arc(currX, currY, 6, 0, Math.PI*2); ctxL.fillStyle = '#ff8200'; ctxL.fill();

                if(progress === 1) { step++; progress = 0; }
                requestAnimationFrame(animate);
             }
             animate();
          }

          /* ===== 🌟 블루델 스타일 핀볼(Plinko) 물리엔진 ===== */
          let pbCanvas, pbCtx;
          let pbLines = []; let pbSpinners = []; let pbBalls = []; let pbSlots = [];
          let pbIsRunning = false;
          let pbColors = ['#ff478e', '#38bdf8', '#facc15', '#a3e635', '#c084fc', '#fb923c', '#fb7185', '#22d3ee'];
          let pinballMapType = 'map1';

          // 점과 선분(segment) 사이의 최단거리 계산 공식
          function distToSegmentSquared(p, v, w) {
             let l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
             if (l2 === 0) return (p.x - v.x)**2 + (p.y - v.y)**2;
             let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
             t = Math.max(0, Math.min(1, t));
             return (p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2;
          }

          function getClosestPointOnSegment(p, v, w) {
             let l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
             if (l2 === 0) return {x:v.x, y:v.y};
             let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
             t = Math.max(0, Math.min(1, t));
             return { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
          }

          function initPinballBoard() {
              pbCanvas = document.getElementById('pinballCanvas');
              if(!pbCanvas) return;
              pbCanvas.width = 250; pbCanvas.height = 600; // 고정 해상도
              pbCtx = pbCanvas.getContext('2d');
              
              pinballMapType = document.getElementById('pb-map-select').value;
              pbLines = []; pbSpinners = []; pbBalls = [];
              let cw = pbCanvas.width; let ch = pbCanvas.height;

              // 맵 생성 로직 (좌우 벽 포함)
              pbLines.push({x1: 0, y1: 0, x2: 0, y2: ch});
              pbLines.push({x1: cw, y1: 0, x2: cw, y2: ch});

              if(pinballMapType === 'map1') { // 운명의 수레바퀴
                  pbSpinners.push({cx: cw/2, cy: 300, len: 120, angle: 0, speed: 0.05});
                  pbSpinners.push({cx: cw/2, cy: 450, len: 100, angle: Math.PI/2, speed: -0.04});
              } else if(pinballMapType === 'map2') { // 지그재그
                  pbLines.push({x1: 0, y1: 150, x2: cw*0.7, y2: 200});
                  pbLines.push({x1: cw, y1: 300, x2: cw*0.3, y2: 350});
                  pbLines.push({x1: 0, y1: 450, x2: cw*0.7, y2: 500});
              } else if(pinballMapType === 'map3') { // 블랙홀
                  pbLines.push({x1: 0, y1: 200, x2: cw*0.4, y2: 300});
                  pbLines.push({x1: cw, y1: 200, x2: cw*0.6, y2: 300});
                  pbSpinners.push({cx: cw/2, cy: 350, len: 80, angle: 0, speed: 0.1});
              } else if(pinballMapType === 'map4') { // 회전교차로
                  pbSpinners.push({cx: cw*0.3, cy: 200, len: 80, angle: 0, speed: 0.06});
                  pbSpinners.push({cx: cw*0.7, cy: 300, len: 80, angle: 0, speed: -0.06});
                  pbSpinners.push({cx: cw*0.3, cy: 400, len: 80, angle: 0, speed: 0.06});
              } else if(pinballMapType === 'map5') { // 벽타기
                  pbLines.push({x1: cw*0.3, y1: 100, x2: cw*0.3, y2: 400});
                  pbLines.push({x1: cw*0.7, y1: 100, x2: cw*0.7, y2: 400});
                  pbSpinners.push({cx: cw/2, cy: 450, len: 100, angle: 0, speed: 0.05});
              } else { // 카오스
                  pbLines.push({x1: cw*0.2, y1: 100, x2: cw*0.8, y2: 150});
                  pbLines.push({x1: cw*0.8, y1: 250, x2: cw*0.2, y2: 300});
                  pbSpinners.push({cx: cw/2, cy: 450, len: 150, angle: 0, speed: 0.08});
              }

              drawPinballFrame();
          }

          function startPinballGame() {
              initPinballBoard();
              const pText = document.getElementById('pb-participants').value.trim().split('\\n').filter(t => t);
              const rText = document.getElementById('pb-rewards').value.trim().split('\\n').filter(t => t);
              
              if(pText.length === 0 || rText.length === 0) { alert('참가자와 보상 슬롯을 최소 1개 이상 입력해주세요!'); return; }

              // `수박*2` 형태 파싱
              let parsedPlayers = [];
              pText.forEach(line => {
                  let parts = line.split('*');
                  let name = parts[0].trim();
                  let count = parts.length > 1 ? parseInt(parts[1]) : 1;
                  if(isNaN(count) || count < 1) count = 1;
                  for(let i=0; i<count; i++) { parsedPlayers.push(name); }
              });

              pbSlots = rText.map((t) => ({ text: t }));
              pbBalls = parsedPlayers.map((p, i) => ({
                  name: p, color: pbColors[i % pbColors.length],
                  x: pbCanvas.width / 2 + (Math.random()*40 - 20), y: 10,
                  vx: (Math.random()-0.5)*2, vy: 0,
                  r: 8, settled: false, slotIndex: -1
              }));
              
              document.getElementById('pb-winner-box').style.display = 'block';
              document.getElementById('pb-winner-text').innerHTML = '<span style="color:var(--text-sub);">구슬이 떨어지고 있습니다...</span>';
              
              if(!pbIsRunning) {
                  pbIsRunning = true;
                  requestAnimationFrame(updatePinball);
              }
          }

          // 구슬끼리의 충돌 감지
          function resolveBallCollision() {
             for(let i=0; i<pbBalls.length; i++) {
                for(let j=i+1; j<pbBalls.length; j++) {
                   let b1 = pbBalls[i]; let b2 = pbBalls[j];
                   if(b1.settled || b2.settled) continue;
                   let dx = b2.x - b1.x; let dy = b2.y - b1.y;
                   let dist = Math.sqrt(dx*dx + dy*dy);
                   let minDist = b1.r + b2.r;
                   if(dist < minDist) {
                      let angle = Math.atan2(dy, dx);
                      let overlap = minDist - dist;
                      b1.x -= Math.cos(angle) * overlap/2; b1.y -= Math.sin(angle) * overlap/2;
                      b2.x += Math.cos(angle) * overlap/2; b2.y += Math.sin(angle) * overlap/2;
                      // 튕기기
                      let nx = dx/dist; let ny = dy/dist;
                      let p = 2 * (b1.vx*nx + b1.vy*ny - b2.vx*nx - b2.vy*ny) / 2;
                      b1.vx -= p*nx; b1.vy -= p*ny;
                      b2.vx += p*nx; b2.vy += p*ny;
                   }
                }
             }
          }

          function updatePinball() {
              if(!pbIsRunning) return;
              let cw = pbCanvas.width; let ch = pbCanvas.height;
              
              pbCtx.clearRect(0,0,cw,ch);
              
              // 스피너 회전 업데이트
              pbSpinners.forEach(sp => { sp.angle += sp.speed; });
              drawPinballFrame();
              
              let allSettled = true;
              const slotW = cw / pbSlots.length;
              
              pbBalls.forEach(b => {
                  if(!b.settled) {
                      allSettled = false;
                      b.vy += 0.2; // 중력
                      b.vy *= 0.99; // 공기 저항
                      b.x += b.vx; b.y += b.vy;
                      
                      // 1. 고정 선분(벽) 충돌
                      pbLines.forEach(line => {
                         let v = {x:line.x1, y:line.y1}; let w = {x:line.x2, y:line.y2};
                         let distSq = distToSegmentSquared(b, v, w);
                         if(distSq < b.r*b.r) {
                            let closest = getClosestPointOnSegment(b, v, w);
                            let dx = b.x - closest.x; let dy = b.y - closest.y;
                            let dist = Math.sqrt(dx*dx + dy*dy);
                            if(dist > 0) {
                               let nx = dx/dist; let ny = dy/dist;
                               b.x = closest.x + nx * b.r; b.y = closest.y + ny * b.r;
                               let dot = b.vx*nx + b.vy*ny;
                               b.vx -= 2*dot*nx; b.vy -= 2*dot*ny;
                               b.vx *= 0.6; b.vy *= 0.6; // 마찰력
                            }
                         }
                      });

                      // 2. 회전하는 스피너 충돌
                      pbSpinners.forEach(sp => {
                         let x1 = sp.cx + Math.cos(sp.angle) * (sp.len/2);
                         let y1 = sp.cy + Math.sin(sp.angle) * (sp.len/2);
                         let x2 = sp.cx - Math.cos(sp.angle) * (sp.len/2);
                         let y2 = sp.cy - Math.sin(sp.angle) * (sp.len/2);
                         
                         let v = {x:x1, y:y1}; let w = {x:x2, y:y2};
                         let distSq = distToSegmentSquared(b, v, w);
                         if(distSq < b.r*b.r) {
                            let closest = getClosestPointOnSegment(b, v, w);
                            let dx = b.x - closest.x; let dy = b.y - closest.y;
                            let dist = Math.sqrt(dx*dx + dy*dy);
                            if(dist > 0) {
                               let nx = dx/dist; let ny = dy/dist;
                               b.x = closest.x + nx * b.r; b.y = closest.y + ny * b.r;
                               // 회전에 의한 추가 물리력 (kick)
                               let kickVx = -Math.sin(sp.angle) * sp.speed * 10;
                               let kickVy = Math.cos(sp.angle) * sp.speed * 10;
                               b.vx += kickVx; b.vy += kickVy;
                            }
                         }
                      });
                      
                      // 슬롯 도착 체크
                      if(b.y > ch - 40 - b.r) {
                          b.y = ch - 40 - b.r;
                          b.vx = 0; b.vy = 0;
                          b.settled = true;
                          b.slotIndex = Math.floor(b.x / slotW);
                          if(b.slotIndex < 0) b.slotIndex = 0;
                          if(b.slotIndex >= pbSlots.length) b.slotIndex = pbSlots.length - 1;
                      }
                  }
                  
                  // 구슬 그리기
                  pbCtx.beginPath(); pbCtx.arc(b.x, b.y, b.r, 0, Math.PI*2);
                  pbCtx.fillStyle = b.color; pbCtx.fill();
                  pbCtx.strokeStyle = '#fff'; pbCtx.lineWidth = 1; pbCtx.stroke();
              });

              resolveBallCollision(); // 구슬끼리 부딪힘
              
              // 화면 밖을 벗어난 구슬 정리
              pbBalls.forEach(b => {
                 if(b.x < 0) b.x = b.r; if(b.x > cw) b.x = cw - b.r;
              });

              // 라이브 랭킹 업데이트 (y좌표 기준, 도착한 애들이 우선)
              let sortedBalls = [...pbBalls].sort((a,b) => b.y - a.y);
              let rankHtml = '';
              sortedBalls.forEach((b, idx) => {
                  let rTxt = b.settled ? (pbSlots[b.slotIndex] ? pbSlots[b.slotIndex].text : '') : '진행중..';
                  rankHtml += '<div class="pb-rank-item" style="border-color:'+b.color+';">' +
                              '<span>' + (idx+1) + '위. ' + b.name + '</span><span style="color:var(--point-color);">' + rTxt + '</span></div>';
              });
              document.getElementById('pb-live-ranks').innerHTML = rankHtml;
              
              if(allSettled) {
                  pbIsRunning = false;
                  let resultHtml = '';
                  pbBalls.forEach(b => {
                      let reward = pbSlots[b.slotIndex] ? pbSlots[b.slotIndex].text : '?';
                      resultHtml += '<span style="color:'+b.color+'; font-weight:900;">' + b.name + '</span> ➔ ' + reward + '<br>';
                  });
                  document.getElementById('pb-winner-text').innerHTML = resultHtml;
              } else {
                  requestAnimationFrame(updatePinball);
              }
          }

          function drawPinballFrame() {
              let cw = pbCanvas.width; let ch = pbCanvas.height;
              
              // 라인
              pbCtx.strokeStyle = '#0284c7'; pbCtx.lineWidth = 3; pbCtx.lineCap = 'round';
              pbLines.forEach(l => {
                 pbCtx.beginPath(); pbCtx.moveTo(l.x1, l.y1); pbCtx.lineTo(l.x2, l.y2); pbCtx.stroke();
              });
              
              // 스피너
              pbCtx.strokeStyle = '#ff8200'; pbCtx.lineWidth = 4;
              pbSpinners.forEach(sp => {
                 let x1 = sp.cx + Math.cos(sp.angle) * (sp.len/2); let y1 = sp.cy + Math.sin(sp.angle) * (sp.len/2);
                 let x2 = sp.cx - Math.cos(sp.angle) * (sp.len/2); let y2 = sp.cy - Math.sin(sp.angle) * (sp.len/2);
                 pbCtx.beginPath(); pbCtx.moveTo(x1, y1); pbCtx.lineTo(x2, y2); pbCtx.stroke();
                 pbCtx.beginPath(); pbCtx.arc(sp.cx, sp.cy, 5, 0, Math.PI*2); pbCtx.fillStyle = '#fff'; pbCtx.fill();
              });

              // 슬롯 구역
              if(pbSlots.length > 0) {
                  let slotW = cw / pbSlots.length;
                  pbCtx.fillStyle = 'rgba(255, 255, 255, 0.1)'; pbCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                  pbCtx.lineWidth = 2; pbCtx.font = '12px Pretendard'; pbCtx.textAlign = 'center';
                  for(let i=0; i<pbSlots.length; i++) {
                      pbCtx.strokeRect(i*slotW, ch - 40, slotW, 40);
                      pbCtx.fillStyle = '#ff8200';
                      pbCtx.fillText(pbSlots[i].text, i*slotW + slotW/2, ch - 15);
                  }
              }
          }


          /* ===== 🌟 VOD 탭 검색 및 카테고리 필터 ===== */
          let currentVodCategory = 'all'; 

          async function loadVods() {
            const container = document.getElementById('vod-grid-container');
            
            try {
              const sheetId = '1wWQ5ziB4hHnhBqqktFb7Yc-Vu-AVrOxdcGBMX860pXQ'; 
              const sheetName = 'VOD'; 
              const timestamp = new Date().getTime();
              const url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:json&headers=1&sheet=' + encodeURIComponent(sheetName) + '&_=' + timestamp;
              
              const response = await fetch(url);
              let text = await response.text();
              text = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
              const data = JSON.parse(text);
              
              let pinnedCards = [];
              let normalCards = [];
              
              if (data.table.rows.length === 0) {
                  container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub); grid-column: 1 / -1;">등록된 VOD 영상이 없습니다.</div>';
                  return;
              }

              data.table.rows.forEach(function(row) {
                if (!row || !row.c) return;
                
                let cells = row.c.map(cell => (cell && cell.v !== null && cell.v !== undefined) ? String(cell.v).trim() : '');
                
                let title = cells[0] || ''; let link = cells[1] || '#';
                let thumb = cells[2] || 'https://via.placeholder.com/640x360/eeeeee/999999?text=No+Thumbnail';
                let duration = cells[3] || ''; let date = cells[4] || '';
                let isPinned = (cells[5] === '고정');
                
                let catText = cells[6] || ''; let category = 'live'; 
                if (catText === '노래커버') { category = 'cover'; }
                else if (catText === '라이브') { category = 'live'; }
                else if (title.indexOf('커버') !== -1 || title.toLowerCase().indexOf('cover') !== -1) { category = 'cover'; }

                if (!title) return; 

                let pinnedClass = isPinned ? ' pinned' : '';
                let pinnedTitle = isPinned ? '<span style="color:var(--point-color);">[고정]</span> ' + title : title;
                let durationHtml = duration ? '<span class="vod-badge">' + duration + '</span>' : '';

                let cardHtml = '<a href="' + link + '" target="_blank" class="vod-card' + pinnedClass + '" data-category="' + category + '">' +
                          '<div class="vod-thumb"><img src="' + thumb + '" alt="썸네일"><div class="vod-play-overlay"><span class="material-symbols-rounded">play_circle</span></div>' + durationHtml + '</div>' +
                          '<div class="vod-info"><div class="vod-title">' + pinnedTitle + '</div><div class="vod-meta-stats"><span>' + date + '</span></div></div></a>';
                        
                if (isPinned) { pinnedCards.push(cardHtml); } else { normalCards.push(cardHtml); }
              });
              
              let finalPinned = pinnedCards.slice(0, 4);
              let remainingSlots = 20 - finalPinned.length;
              let finalNormal = normalCards.slice(0, remainingSlots);
              let combinedCards = finalPinned.concat(finalNormal);

              if(combinedCards.length === 0) {
                  container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub); grid-column: 1 / -1;">등록된 VOD 영상이 없습니다.</div>';
              } else {
                  container.innerHTML = combinedCards.join('');
              }
            } catch (err) {
              console.error(err);
              container.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub); grid-column: 1 / -1;">VOD 구글 시트 연동에 실패했습니다.<br>구글 시트 하단에 <strong>[VOD]</strong> 라는 이름의 탭이 있는지 확인해주세요.</div>';
            }
          }

          function filterVodsByCategory(cat, btnElement) {
            currentVodCategory = cat;
            var parentTabs = btnElement.parentElement.querySelectorAll('.sub-tab-btn');
            parentTabs.forEach(function(b) { b.classList.remove('active'); });
            btnElement.classList.add('active');
            filterVods();
          }

          function filterVods() {
            const query = document.getElementById('vod-search-input').value.toLowerCase();
            const vodCards = document.querySelectorAll('#tab-vod .vod-card');
            vodCards.forEach(function(card) {
              const title = card.querySelector('.vod-title').textContent.toLowerCase();
              const cat = card.getAttribute('data-category');
              const matchQuery = title.indexOf(query) !== -1;
              const matchCat = (currentVodCategory === 'all' || cat === currentVodCategory);
              if (matchQuery && matchCat) { card.style.display = 'flex'; } 
              else { card.style.display = 'none'; }
            });
          }

          document.addEventListener('DOMContentLoaded', () => {
            renderCalendar();
            renderLadderInputs(); 
            loadVods(); 
            
            updateLockTime();
            setInterval(updateLockTime, 1000);

            const lockScreen = document.getElementById('lock-screen');
            if(lockScreen) {
              lockScreen.addEventListener('touchstart', e => { lockStartY = e.touches[0].clientY; });
              lockScreen.addEventListener('touchmove', e => {
                let moveY = e.touches[0].clientY;
                if (lockStartY - moveY > 50) { unlockScreen(); }
              });
            }
          });

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
