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
          /* 폰트 및 기본 배경 설정 */
          body { 
            font-family: 'Pretendard', -apple-system, sans-serif; 
            text-align: center; 
            background-color: #121212; 
            color: #ffffff; 
            padding: 50px 20px; 
            margin: 0;
          }
          
          /* 프로필 카드가 들어갈 박스 디자인 */
          .profile-container { 
            background: #1e1e1e; 
            padding: 40px 30px; 
            border-radius: 24px; 
            max-width: 380px; 
            margin: 0 auto; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
          }

          /* 동그란 프로필 이미지 영역 */
          .profile-image {
            width: 120px;
            height: 120px;
            background-color: #333;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #888;
            
            /* 👇 프로필 사진을 넣고 싶다면 아래 주소(https://...)를 실제 이미지 주소로 변경하세요. 
               사진이 없다면 이 줄 맨 앞에 /* 를 붙이고 맨 뒤에 */ 를 붙여서 주석 처리하시면 됩니다. */
            background-image: url('https://profile.img.afreecatv.com/LOGO/so/songhy/songhy.jpg');
            
            background-size: cover;
            background-position: center;
          }

          /* 닉네임과 소개글 디자인 */
          h1 { 
            margin: 0 0 10px 0; 
            font-size: 26px;
            font-weight: 800;
          }
          p { 
            color: #b3b3b3; 
            font-size: 15px;
            margin-bottom: 30px;
            line-height: 1.6;
          }

          /* 링크 버튼 공통 디자인 */
          .link-btn { 
            display: block; 
            margin-top: 12px; 
            padding: 16px; 
            background: #0058ff; 
            color: white; 
            text-decoration: none; 
            border-radius: 12px; 
            font-weight: bold;
            font-size: 16px;
            transition: background 0.2s, transform 0.1s;
          }
          
          /* 마우스를 올렸을 때 버튼 효과 */
          .link-btn:hover {
            background: #0046cc;
            transform: translateY(-2px);
          }
          
          /* 유튜브 버튼 전용 컬러 */
          .link-btn.youtube {
            background: #ff0000;
          }
          .link-btn.youtube:hover {
            background: #cc0000;
          }
        </style>
      </head>
      <body>
        <div class="profile-container">
          <!-- 프로필 사진 (이미지가 들어가면 텍스트는 안 보이기 때문에 비워두었습니다) -->
          <div class="profile-image"></div>
          
          <!-- 닉네임 -->
          <h1>송현_</h1>
          
          <!-- 짧은 소개글 -->
          <p>안녕하세요! SOOP 스트리머 송현_입니다.<br>오늘도 찾아와 주셔서 감사합니다 💙</p>
          
          <!-- SOOP 방송국 링크 (정상 수정됨) -->
          <a href="https://www.sooplive.com/station/songhy" target="_blank" class="link-btn">SOOP 방송국 바로가기</a>
          
          <!-- 유튜브 링크 (정상 수정됨) -->
          <a href="https://www.youtube.com/@songhy___/featured" target="_blank" class="link-btn youtube">유튜브 채널 구경하기</a>
        </div>
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
