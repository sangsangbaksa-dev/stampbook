# Stampbook 출시 체크리스트 (사용자가 직접 할 일)

현재 코드의 결제는 Gumroad가 아니라 Lemon Squeezy(`config.js`의 checkout URL, `lib/license-core.js`)입니다. 선택적 Supabase 클라우드 백업이 이미 연결되어 있습니다. 아래 1번과 "알아둘 한계" 중 Gumroad만 있고 데이터가 브라우저 안에만 있다고 적은 문장은 현재 코드와 다릅니다. 상품 ID, 활성화 횟수, 키 만료, 스토어 테스트 모드는 이 체크리스트가 확인한 값이 아닙니다.



코드와 문서는 준비되어 있습니다. 아래는 계정, 결제, 법적 판단이 필요해서 사용자 본인이 해야 하는 일입니다. 순서대로 하면 됩니다.

## 0. Cloudflare Pages로 옮기기 (권장: Vercel 무료 플랜은 상업 이용 제한)
자세한 설정값과 검증 내용은 `docs/cloudflare-pages.md`.
- [ ] Cloudflare 계정 만들기(무료)
- [ ] Workers & Pages > Create > Pages > Connect to Git. GitHub 연결 허용 후 저장소 `sangsangbaksa-dev/App-Multi` 선택
- [ ] 설정 입력: Framework preset `None`, Root directory `stampbook`, Build command `node scripts/build.js --dist`, Build output directory `dist`
- [ ] Production branch: PR #2를 머지한 뒤 `main`. 머지 전에 보고 싶으면 이 브랜치의 Preview 주소로 먼저 확인
- [ ] Settings > Variables and Secrets에 `GUMROAD_PRODUCT_ID` 입력(Production과 Preview 둘 다). 값이 없으면 임시 키 검사로 동작
- [ ] 배포 후 `https://<프로젝트>.pages.dev` 에서 랜딩, 앱, `/terms`, `/privacy`를 열어 보고 `config.js`의 `siteUrl`을 그 주소로 바꿔 커밋(다시 자동 배포)
- [ ] 도메인: Pages 프로젝트 > Custom domains에서 연결(도메인 구입은 사용자 몫). 연결 후 `siteUrl`을 다시 갱신
- [ ] 확인이 끝나면 Vercel 프로젝트 `stampbook-lessons`를 정리(삭제 전에 주소가 어디서도 쓰이지 않는지 확인)

## 1. 결제 링크
- [ ] `config.js`의 checkout URL은 그대로 둡니다. 스토어 호스트만으로 다른 상품이라고 바꾸지 않습니다.
- [ ] 공개 결제 페이지의 상품명, 가격, 1회/구독 여부를 랜딩과 약관과 다시 대조합니다. 대시보드를 새로 열기 전에는 활성화 횟수, 키 만료, 테스트 모드를 현재 사실로 적지 않습니다.
- [ ] 실제 카드 결제가 켜져 있는지는 이 저장소가 확인하지 않았습니다. 테스트 구매는 운영자가 직접 판단합니다.

## 2. config.js 한 곳만 수정
`stampbook/config.js`
- [ ] `checkoutUrl` = 위 결제 링크
- [ ] `supportEmail` = 실제 문의/환불 이메일
- [ ] `price` = 실제 가격 표기
- [ ] `siteUrl` = 최종 도메인(아직 없으면 그대로)

수정 후 커밋하면 Vercel이 배포하면서 `node scripts/build.js`로 랜딩, 약관, 개인정보, sitemap, robots를 다시 만듭니다. 별도 작업 없음.

## 3. 환경변수 입력 (Cloudflare Pages: Settings > Variables and Secrets / Vercel을 쓸 경우 Project > Settings > Environment Variables)
- [ ] 선택 값 `LEMONSQUEEZY_PRODUCT_ID`는 다른 상품의 키를 거절할 때만 넣습니다. 코드에 상품 ID를 적지 않습니다. `LEMONSQUEEZY_DISABLED=1`이면 함수는 `{configured:false}`를 돌려줍니다.
- 값이 없어도 Lemon Squeezy 키 확인은 동작합니다. 함수가 없거나 `{configured:false}`일 때만 앱의 임시 오프라인 검사가 쓰입니다.
- [ ] 실제 카드 결제가 켜져 있는지는 아직 확인되지 않았습니다. 운영자가 테스트 모드인지 확인한 뒤에만 구매로 키를 받아 활성화와 거절을 시험합니다.
- (Vercel을 계속 쓸 때만) Production Branch / Ignored Build Step: PR #2 머지 후 main 빌드가 되도록 `claude/project-thread-emx3f1`만 허용한 현재 설정을 바꿔야 합니다(Settings > Git).

## 4. 도메인 (선택, 권장)
- [ ] 도메인 구입 후 Vercel Project > Domains에서 연결. 연결 뒤 `config.js`의 `siteUrl`을 새 주소로 바꿔 커밋.
- [ ] Google Search Console에 등록하고 `/sitemap.xml` 제출.

## 5. 법적·사업 판단 (제가 판단할 수 없는 부분)
- [ ] 사업자 등록 여부: 해외 결제 플랫폼으로 수익이 생기면 한국에서는 소득 신고 대상일 수 있습니다. 개인 부업인지 사업자 등록이 필요한지는 세무사 또는 국세청 상담으로 확인하세요(확인하지 못한 항목).
- [ ] 이용약관(`/terms`)과 개인정보(`/privacy`) 읽어 보고 환불 기간(14일), 문구가 의도와 맞는지 확인. 환불 이메일은 `supportEmail`이 그대로 들어갑니다.
- [ ] 결제 플랫폼 정책과 약관의 환불 규정이 서로 어긋나지 않는지 확인.

## 6. 출시 전 최종 점검
- [ ] 실제 휴대폰(iPhone Safari, Android Chrome)에서 앱 열기, 홈 화면에 추가, 비행기 모드에서 동작
- [ ] 일본어, 중국어, 스페인어 문구를 원어민에게 한 번 보여주기(현재 AI 번역, 검수 전)
- [ ] 결제 → 키 수신 → 활성화 → 잔여 링크와 CSV가 열리는지 전체 흐름 1회
- [ ] 백업 파일 받기와 복원 1회

## 알아둘 한계
- 라이선스 확인은 브라우저가 키를 `/api/license`로 보내고, 그 함수가 Lemon Squeezy에 예/아니오를 묻는 구조입니다. 기능 자체는 브라우저 안에서 열리므로 개발자 도구로 표시를 바꿀 수는 있습니다.
- 클라우드 백업을 켜지 않으면 수업 기록은 이 브라우저에 있습니다. 켜면 Supabase에 사본이 갑니다. 라이선스 키와 언어, 화면 모양은 그 사본에서 뺍니다.
- 라이선스 서버 함수에 요청 횟수 제한은 없습니다. 남용이 보이면 Vercel 방화벽 규칙으로 제한하세요.
