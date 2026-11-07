/* Privacy policy and terms in the five app languages. Edit here; build.js renders them.
   English is the reference if a translation conflicts. Do not add a deadline, storage region,
   or a promise the app cannot perform. */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const T = {
  privacy: {
    en: { h: 'Privacy', p: [
      'Stampbook runs in your browser. Student names, lesson dates, notes and prices are saved in this browser\'s local storage on your device. That lesson data is not included in the licence check. These pages do not set cookies and do not include an analytics script. Lesson data is sent to a database provider only if you turn on the optional cloud backup below.',
      'Cloud backup (optional, off by default): only if you create an account and log in with email and password, the app sends a copy of the data saved in this browser, except the licence key, licence status, language and appearance. The copy is stored with the database provider Supabase, along with the email address used to log in and a short device label read from the browser. The app attaches your login to those requests. This page does not certify who else can read that copy, and it does not state a storage region. Logging out stops syncing on this device. It does not delete the cloud copy or the account, and the app has no control that deletes them. To ask for removal, email {email}. This page states no deadline for that request.',
      'A balance link contains one student\'s name, lesson dates and lesson count inside the address after the # sign. That part of an address is not sent to a server when the page loads, but anyone who has the link can read it, and the chat app you paste it into may keep it. Share it only with that student.',
      'Licence key: when you activate a key, this browser sends the key to our server function. The function checks it with our payment provider (Lemon Squeezy) and returns yes or no. The function\'s code does not write the key to a database or a log. The browser keeps the key in local storage so this device can stay unlocked. The provider holds the purchase record and your payment details under its own privacy policy. Stampbook does not see your card, and it does not keep a separate copy of your cloud-backup password.',
      'Clearing this browser\'s data deletes the stamps on this device. Use Backup to keep a file copy. Clearing the browser does not delete a cloud copy you already uploaded.',
      'Contact: {email}. Last updated 2026-11-07.'] },
    ko: { h: '개인정보', p: [
      '스탬프북은 브라우저 안에서 동작합니다. 수강생 이름, 수업 날짜, 메모, 금액은 이 브라우저의 로컬 저장소에 저장됩니다. 그 수업 기록은 라이선스 확인 요청에 들어가지 않습니다. 이 페이지는 쿠키를 설정하지 않고 분석 스크립트를 넣지 않습니다. 수업 기록은 아래의 선택 기능인 클라우드 백업을 켠 경우에만 데이터베이스 제공업체로 전송됩니다.',
      '클라우드 백업(선택, 기본 꺼짐): 이메일과 비밀번호로 계정을 만들어 로그인한 경우에만, 이 브라우저에 저장된 데이터 가운데 라이선스 키, 라이선스 상태, 언어, 화면 모양을 제외한 사본을 보냅니다. 사본은 데이터베이스 제공업체 Supabase에 저장되며, 로그인에 쓴 이메일과 브라우저에서 읽은 짧은 기기 표식도 함께 저장됩니다. 앱은 그 요청에 본인 로그인을 붙입니다. 이 문서는 그 사본을 누가 더 읽을 수 있는지 보증하지 않으며, 저장 지역도 적지 않습니다. 로그아웃하면 이 기기의 동기화는 멈춥니다. 클라우드 사본이나 계정은 지워지지 않고, 앱에는 이를 지우는 기능이 없습니다. 삭제를 요청하려면 {email}로 보내 주세요. 이 문서는 그 요청의 처리 기한을 정하지 않습니다.',
      '잔여 링크에는 수강생 한 명의 이름, 수업 날짜, 횟수가 주소의 # 뒤에 담깁니다. 이 부분은 페이지를 열 때 서버로 전송되지 않지만 링크를 가진 사람은 누구나 읽을 수 있고, 붙여넣은 메신저가 보관할 수 있습니다. 해당 수강생에게만 보내세요.',
      '라이선스 키: 키를 활성화하면 이 브라우저가 키를 우리 서버 함수로 보냅니다. 서버 함수는 결제 대행사(Lemon Squeezy)에 확인해 맞는지 틀린지만 돌려줍니다. 서버 함수의 코드는 키를 데이터베이스나 로그에 쓰지 않습니다. 브라우저는 이 기기의 잠금 해제를 유지하려고 키를 로컬 저장소에 남겨 둡니다. 구매 기록과 결제 정보는 결제 대행사가 자체 방침에 따라 보관하며, 스탬프북은 카드 정보를 보지 못하고 클라우드 백업 비밀번호의 별도 사본도 보관하지 않습니다.',
      '이 브라우저의 데이터를 지우면 이 기기의 도장 기록도 삭제됩니다. 파일 사본은 백업으로 보관하세요. 브라우저 데이터를 지워도 이미 올린 클라우드 사본은 지워지지 않습니다.',
      '문의: {email}. 최종 수정 2026-11-07.'] },
    ja: { h: 'プライバシー', p: [
      'スタンプブックはブラウザの中で動きます。生徒さんの名前、レッスン日、メモ、金額は、このブラウザのローカルストレージに保存されます。そのレッスン記録はライセンス確認のリクエストには含まれません。これらのページはクッキーを設定せず、解析スクリプトも含みません。レッスン記録がデータベース事業者へ送られるのは、下の任意のクラウドバックアップをオンにした場合だけです。',
      'クラウドバックアップ（任意、初期はオフ）: メールとパスワードでアカウントを作りログインした場合に限り、このブラウザに保存されたデータのうち、ライセンスキー、ライセンス状態、言語、表示設定を除いた写しを送ります。写しはデータベース事業者の Supabase に保存され、ログインに使ったメールアドレスと、ブラウザから読んだ短い端末ラベルも一緒に保存されます。アプリはそのリクエストに本人のログインを付けます。この文書は、その写しを他の誰が読めるかを保証せず、保存地域も記しません。ログアウトするとこの端末の同期は止まります。クラウドの写しもアカウントも消えず、アプリにそれらを消す操作はありません。削除を依頼するには {email} へ送ってください。この文書はその依頼の期限を定めません。',
      '残数リンクには、生徒さん一人の名前、レッスン日、回数がアドレスの # 以降に入ります。ページを開くときその部分はサーバーへ送られませんが、リンクを持っていれば誰でも読め、貼り付けたチャットアプリが保管することがあります。その生徒さんにだけ送ってください。',
      'ライセンスキー: キーを有効にすると、このブラウザはキーを当社のサーバー関数へ送ります。関数は決済事業者（Lemon Squeezy）に確認し、合うか合わないかだけを返します。関数のコードはキーをデータベースやログに書きません。ブラウザは、この端末のロック解除を保つためキーをローカルストレージに残します。購入記録と支払い情報は決済事業者が自身の方針に従って保管し、スタンプブックはカード情報を見ません。クラウドバックアップのパスワードの別コピーも持ちません。',
      'このブラウザのデータを消すと、この端末のスタンプも消えます。ファイルの写しはバックアップで残してください。ブラウザのデータを消しても、すでにアップロードしたクラウドの写しは消えません。',
      '連絡先: {email}。最終更新 2026-11-07。'] },
    zh: { h: '隐私', p: [
      '印章本在浏览器中运行。学员姓名、上课日期、备注和金额保存在此浏览器的本地存储中。这些上课记录不会放进许可证校验请求。这些页面不设置 cookie，也不包含分析脚本。只有打开下面的可选云备份时，上课记录才会发送给数据库提供方。',
      '云备份（可选，默认关闭）：只有用邮箱和密码创建账号并登录时，应用才会发送此浏览器中已保存数据的副本，其中不包括许可证密钥、许可证状态、语言和外观。副本保存在数据库提供方 Supabase，同时保存用于登录的邮箱，以及从浏览器读取的简短设备标记。应用会在这些请求上附上你的登录。本文不保证还有谁能读取该副本，也不写明存储地区。退出登录会停止此设备上的同步。它不会删除云端副本或账号，应用里也没有删除它们的操作。如需请求删除，请发邮件至 {email}。本文不规定该请求的处理期限。',
      '余额链接在地址的 # 后面包含一位学员的姓名、上课日期和课时数。打开页面时这一段不会发给服务器，但持有链接的人都能读取，你粘贴到的聊天应用也可能留存。请只发给该学员。',
      '许可证密钥：激活密钥时，此浏览器把密钥发给我们的服务器函数。函数向支付服务商（Lemon Squeezy）核对，只返回是否有效。函数代码不把密钥写入数据库或日志。浏览器把密钥留在本地存储中，以便此设备保持解锁。购买记录和支付信息由支付服务商按自己的政策保存。印章本看不到你的卡，也不另存云备份密码。',
      '清除此浏览器的数据会删除此设备上的盖章记录。请用备份保留文件副本。清除浏览器不会删除已经上传的云端副本。',
      '联系：{email}。最后更新 2026-11-07。'] },
    es: { h: 'Privacidad', p: [
      'Stampbook funciona en tu navegador. Los nombres de los alumnos, las fechas de las clases, las notas y los importes se guardan en el almacenamiento local de este navegador en tu dispositivo. Esos datos de las clases no van en la comprobación de la licencia. Estas páginas no instalan cookies ni incluyen un script de analítica. Los datos de las clases se envían a un proveedor de base de datos solo si activas la copia opcional en la nube que se describe abajo.',
      'Copia en la nube (opcional, desactivada por defecto): solo si creas una cuenta e inicias sesión con correo y contraseña, la app envía una copia de los datos guardados en este navegador, excepto la clave de licencia, el estado de la licencia, el idioma y la apariencia. La copia se guarda con el proveedor Supabase, junto con el correo usado para entrar y una etiqueta corta del dispositivo leída del navegador. La app adjunta tu sesión a esas solicitudes. Esta página no certifica quién más puede leer esa copia y no indica una región de almacenamiento. Cerrar sesión detiene la sincronización en este dispositivo. No borra la copia en la nube ni la cuenta, y la app no tiene un control que las borre. Para pedir la eliminación, escribe a {email}. Esta página no fija un plazo para esa solicitud.',
      'Un enlace de saldo contiene el nombre de un solo alumno, las fechas de las clases y el número de clases dentro de la dirección, después del signo #. Esa parte no se envía a un servidor al abrir la página, pero cualquiera que tenga el enlace puede leerla, y la aplicación de chat donde lo pegues puede conservarlo. Envíalo solo a ese alumno.',
      'Clave de licencia: al activar una clave, este navegador la envía a nuestra función de servidor. La función la comprueba con nuestro proveedor de pago (Lemon Squeezy) y responde sí o no. El código de la función no escribe la clave en una base de datos ni en un registro. El navegador guarda la clave en el almacenamiento local para que este dispositivo siga desbloqueado. El proveedor conserva el registro de la compra y los datos de pago según su propia política. Stampbook no ve tu tarjeta y no guarda una copia aparte de la contraseña de la copia en la nube.',
      'Borrar los datos de este navegador borra los sellos de este dispositivo. Usa Copia de seguridad para conservar un archivo. Borrar el navegador no borra una copia en la nube que ya hayas subido.',
      'Contacto: {email}. Última actualización: 2026-11-07.'] }
  },
  terms: {
    en: { h: 'Terms', p: [
      'Stampbook is a tool for keeping count of prepaid lessons. It is provided as is. It does not process payments between you and your students, and it is not tax, legal or accounting advice. You are responsible for your own records; keep backups.',
      'Stampbook is a paid app, with no free version. The linked Lemon Squeezy checkout\'s product name is Stampbook Pro, and its displayed price is a one-time {price}, not a subscription. A licence key that the check accepts unlocks the app on that device, including unlimited packs, balance links and CSV export. This page does not state how many devices one key can activate, and it does not confirm that live card charges are enabled. We may change the price for new buyers; a later price change does not remove a purchase already paid for.',
      'Refunds: if Stampbook does not work for you, email {email} within 14 days of purchase and we will refund the payment. Payments are handled by our payment provider, which acts as the seller of record where applicable.',
      'Do not use Stampbook for anything unlawful, and do not try to defeat the licence check. We may stop supporting the service with reasonable notice; the app keeps working offline from the files you have already loaded, and you can export your data at any time.',
      'Contact: {email}. Last updated 2026-11-07.'] },
    ko: { h: '이용약관', p: [
      '스탬프북은 선결제 수강권의 횟수를 기록하는 도구이며 현재 상태 그대로 제공됩니다. 선생님과 수강생 사이의 결제를 처리하지 않고, 세무·법률·회계 자문이 아닙니다. 기록의 관리 책임은 사용자에게 있으니 백업해 두세요.',
      '스탬프북은 무료 버전 없이 유료로만 제공됩니다. 연결된 Lemon Squeezy 결제 상품 이름은 Stampbook Pro이고, 표시 가격은 {price} 1회이며 구독이 아닙니다. 확인을 통과한 라이선스 키는 그 기기에서 수강권 무제한, 잔여 링크, CSV 내보내기를 포함해 앱을 엽니다. 이 문서는 키 하나로 열 수 있는 기기 수를 적지 않으며, 실제 카드 결제가 켜져 있는지도 확인하지 않습니다. 신규 구매자의 가격은 바뀔 수 있지만, 가격 변경이 이미 결제한 구매를 지우지는 않습니다.',
      '환불: 스탬프북이 맞지 않으면 구매 후 14일 이내에 {email}로 메일을 주시면 결제를 환불합니다. 결제는 결제 대행사가 처리하며 해당되는 경우 대행사가 판매자 역할을 합니다.',
      '불법적인 용도로 쓰지 말고 라이선스 확인을 우회하려 하지 마세요. 서비스 지원은 합리적인 사전 공지 후 종료될 수 있으며, 이미 불러온 파일로 오프라인에서 계속 동작하고 데이터는 언제든 내보낼 수 있습니다.',
      '문의: {email}. 최종 수정 2026-11-07.'] },
    ja: { h: '利用規約', p: [
      'スタンプブックは前払いレッスンの回数を記録する道具で、現状のまま提供されます。先生と生徒さんの間の決済は扱わず、税務・法律・会計の助言でもありません。記録の管理は利用者の責任です。バックアップを残してください。',
      'スタンプブックは無料版のない有料アプリです。リンク先の Lemon Squeezy の商品名は Stampbook Pro で、表示価格は {price} の買い切りであり、月額ではありません。確認を通ったライセンスキーは、その端末で回数券の無制限、残数リンク、CSV書き出しを含めアプリを開きます。この文書は、一つのキーで使える端末数を記さず、実際のカード決済が有効かも確認していません。新規購入者の価格は変わることがありますが、価格の変更が支払い済みの購入を取り消すものではありません。',
      '返金: スタンプブックが合わない場合は、購入から14日以内に {email} へメールをください。支払いを返金します。支払いは決済事業者が処理し、当てはまる場合は事業者が販売者となります。',
      '違法な目的に使わず、ライセンス確認を回避しないでください。合理的な事前の告知のあと、サービスのサポートを終えることがあります。すでに読み込んだファイルではオフラインのまま動き、データはいつでも書き出せます。',
      '連絡先: {email}。最終更新 2026-11-07。'] },
    zh: { h: '服务条款', p: [
      '印章本是记录预付课时次数的工具，按当前状态提供。它不处理你和学员之间的付款，也不是税务、法律或会计建议。记录由你自行负责，请做备份。',
      '印章本是付费应用，没有免费版。所链接的 Lemon Squeezy 结账商品名称是 Stampbook Pro，标价为一次 {price}，不是订阅。通过校验的许可证密钥会在该设备上解锁应用，包括不限数量的课时包、余额链接和 CSV 导出。本文不写明一把密钥可以激活多少台设备，也不确认已经开通真实的银行卡扣款。新购买者的价格可能变化；之后的价格变动不会取消已经支付的购买。',
      '退款：如果印章本不适合你，请在购买后 14 天内发邮件至 {email}，我们会退还该笔付款。付款由支付服务商处理；在适用的情况下，由该服务商担任销售方。',
      '请勿用于违法用途，也不要试图绕过许可证校验。服务支持可能在合理提前通知后停止。已经加载的文件仍可离线使用，数据可以随时导出。',
      '联系：{email}。最后更新 2026-11-07。'] },
    es: { h: 'Términos', p: [
      'Stampbook es una herramienta para llevar la cuenta de clases pagadas por adelantado. Se ofrece tal cual. No procesa pagos entre tú y tus alumnos, y no es asesoramiento fiscal, jurídico ni contable. Tú respondes de tus propios registros; guarda copias.',
      'Stampbook es una app de pago, sin versión gratuita. El producto del checkout de Lemon Squeezy enlazado se llama Stampbook Pro, y el precio mostrado es un pago único de {price}, no una suscripción. Una clave de licencia que supere la comprobación desbloquea la app en ese dispositivo, incluidos los bonos ilimitados, los enlaces de saldo y la exportación CSV. Esta página no indica cuántos dispositivos puede activar una clave, y no confirma que los cobros reales con tarjeta estén activados. El precio para nuevos compradores puede cambiar; un cambio de precio posterior no anula una compra ya pagada.',
      'Reembolsos: si Stampbook no te sirve, escribe a {email} dentro de los 14 días siguientes a la compra y reembolsaremos el pago. Los pagos los gestiona nuestro proveedor de pago, que actúa como vendedor registrado cuando corresponde.',
      'No uses Stampbook para nada ilícito y no intentes eludir la comprobación de la licencia. Podemos dejar de mantener el servicio con un aviso razonable; la app sigue funcionando sin conexión con los archivos que ya hayas cargado, y puedes exportar tus datos en cualquier momento.',
      'Contacto: {email}. Última actualización: 2026-11-07.'] }
  }
};
const LANGS = ['en', 'ko', 'ja', 'zh', 'es'];
function render(page, SITE, base) {
  const fill = s => esc(s).replace(/\{email\}/g, `<a href="mailto:${esc(SITE.supportEmail)}">${esc(SITE.supportEmail)}</a>`).replace(/\{price\}/g, esc(SITE.price));
  const sec = (lang, o) => `<section lang="${lang}"><h1 style="font-size:34px">${esc(o.h)}</h1>${o.p.map(x => `<p>${fill(x)}</p>`).join('')}</section>`;
  const title = page === 'privacy' ? 'Privacy · 개인정보 · プライバシー · 隐私 · Privacidad · Stampbook' : 'Terms · 이용약관 · 利用規約 · 服务条款 · Términos · Stampbook';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link rel="canonical" href="${base}/${page}"><meta name="description" content="Stampbook ${page}"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/landing.css"></head>
<body><div class="wrap"><nav><a class="logo" href="/"><img src="/icon.svg" alt="" width="28" height="28"> Stampbook</a></nav><main>${LANGS.map(l => sec(l, T[page][l])).join('')}
<p class="fine">If a translation disagrees with the English text, the English text is the reference. / 번역이 영어와 다르면 영어를 기준으로 합니다. / 訳文が英文と異なる場合は英文を基準とします。 / 若译文与英文不一致，以英文为准。 / Si una traducción no coincide con el inglés, prevalece el inglés.</p></main>
<footer><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/">Stampbook</a></footer></div></body></html>`;
}
module.exports = { render, T };
