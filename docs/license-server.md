# 라이선스 서버 함수

`api/license.js`(Vercel/Node)와 `functions/api/license.js`(Cloudflare Pages)는 `lib/license-core.js`를 같이 씁니다. Gumroad 호출은 현재 코드에 없습니다.

- `POST /api/license`에 `{ key }`를 보냅니다. 키는 8–80자의 영숫자와 하이픈만 허용합니다. 그 외 메서드는 405입니다.
- `LEMONSQUEEZY_DISABLED=1`이면 `{ configured: false }`를 돌려주고, 앱은 그 응답일 때만 임시 오프라인 검사로 넘어갑니다.
- 그 외에는 `POST https://api.lemonsqueezy.com/v1/licenses/validate`에 `license_key`만 전달합니다. 비밀 키는 쓰지 않습니다.
- `valid === true`이고 `license_key.status`가 `active` 또는 `inactive`일 때만 `{ ok: true, instanceId: '' }`입니다. 활성화 슬롯은 쓰지 않습니다.
- 선택 환경변수 `LEMONSQUEEZY_PRODUCT_ID`가 있으면 `meta.product_id`가 같을 때만 통과합니다. 코드에 상품 ID를 박아 두지 않았습니다.
- 그 외 상태(예: disabled)는 `{ ok: false, reason: 'refunded' }`입니다. 서버 함수는 키를 저장하거나 로그하지 않습니다.
- 앱의 주간 재확인은 `instanceId`가 비어 있지 않을 때만 실행됩니다. 위 응답은 `instanceId`를 빈 문자열로 주므로, 이 경로로는 이미 열린 기기를 다시 확인하지 않습니다. 이 동작은 이번 문구 수정에서 바꾸지 않았습니다.

공개 결제 페이지에서 읽은 상품 정보와, 대시보드를 다시 열지 않은 과거 기록은 `docs/release-review.md`에 구분해 두었습니다.
