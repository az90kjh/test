export default {
  async fetch(request, env, ctx) {
    // 이곳에 사이트 화면(HTML)을 코딩합니다.
    const html = `
      
      
      
        
        
        스트리머 프로필
        
      
      
        
          스트리머 OOO
          종합 게임 방송 스트리머입니다!
          치지직 방송국 가기
          유튜브 채널 가기
        
      
      
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
