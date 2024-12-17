<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="FoodieBuddy_Client_0"></a>FoodieBuddy_Client</h1>
<h2 class="code-line" data-line-start=2 data-line-end=3 ><a id=" 1_Source_code___2"></a>🥫 1. Source code에 대한 설명</h2>
<p class="has-line-data" data-line-start="4" data-line-end="5">이 프로젝트는 <strong>React Native</strong>를 기반으로 한 모바일 애플리케이션입니다.</p>
<p class="has-line-data" data-line-start="6" data-line-end="7">프로젝트는 <code>@react-native-community/cli</code>를 사용해 부트스트랩 되었으며, <strong>TypeScript</strong>를 포함한 현대적인 모바일 개발 환경을 제공합니다.</p>
<p class="has-line-data" data-line-start="8" data-line-end="9">주요 폴더 구조는 다음과 같습니다:</p>
<ol>
<li class="has-line-data" data-line-start="10" data-line-end="11"><strong>apis:</strong> API 호출 및 관련 로직 관리</li>
<li class="has-line-data" data-line-start="11" data-line-end="12"><strong>assets:</strong> 이미지, 폰트 등 정적 자산 관리</li>
<li class="has-line-data" data-line-start="12" data-line-end="13"><strong>components:</strong> 재사용 가능한 UI 컴포넌트 모음</li>
<li class="has-line-data" data-line-start="13" data-line-end="14"><strong>constants:</strong> 프로젝트 전반에서 사용되는 상수 관리</li>
<li class="has-line-data" data-line-start="14" data-line-end="15"><strong>hooks:</strong> 커스텀 훅 관리</li>
<li class="has-line-data" data-line-start="15" data-line-end="16"><strong>navigations:</strong> 앱의 네비게이션 설정 및 관리</li>
<li class="has-line-data" data-line-start="16" data-line-end="17"><strong>screens:</strong> 화면 단위의 컴포넌트 모음</li>
<li class="has-line-data" data-line-start="17" data-line-end="18"><strong>states:</strong> Redux 상태 관리 관련 파일</li>
<li class="has-line-data" data-line-start="18" data-line-end="19"><strong>utils:</strong> 유틸리티 함수 및 공통 로직 관리</li>
<li class="has-line-data" data-line-start="19" data-line-end="21"><strong>webSocket:</strong> 웹소켓 관련 로직 및 상태 관리</li>
</ol>
<p class="has-line-data" data-line-start="21" data-line-end="22">전체 폴더 구조는 다음과 같습니다.</p>
<pre><code class="has-line-data" data-line-start="24" data-line-end="86">📦src
 ┣ 📂apis
 ┃ ┗ 📜api.ts
 ┣ 📂assets
 ┃ ┗ 📜circleLogo.png
 ┣ 📂components
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📜AddInstructionBtn.tsx
 ┃ ┃ ┣ 📜ChatbotInstruction.tsx
 ┃ ┃ ┣ 📜ImageInput.tsx
 ┃ ┃ ┣ 📜MessageInput.tsx
 ┃ ┃ ┗ 📜MessageItem.tsx
 ┃ ┣ 📜BookmarkContainer.tsx
 ┃ ┣ 📜CustomButton.tsx
 ┃ ┗ 📜InputField.tsx
 ┣ 📂constants
 ┃ ┣ 📜colors.ts
 ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┗ 📜useForm.ts
 ┣ 📂navigations
 ┃ ┣ 📂drawer
 ┃ ┃ ┣ 📜CustomDrawerContent.tsx
 ┃ ┃ ┗ 📜MainDrawerNavigator.tsx
 ┃ ┣ 📂root
 ┃ ┃ ┗ 📜RootNavigator.tsx
 ┃ ┣ 📂stack
 ┃ ┃ ┣ 📜AuthStackNavigator.tsx
 ┃ ┃ ┗ 📜SettingsStackNavigator.tsx
 ┃ ┗ 📜navigations.ts
 ┣ 📂screens
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜LoginScreen.tsx
 ┃ ┃ ┣ 📜NicknameScreen.jsx
 ┃ ┃ ┣ 📜OnboardingScreen.tsx
 ┃ ┃ ┗ 📜SignupScreen.tsx
 ┃ ┣ 📂bookmarks
 ┃ ┃ ┗ 📜BookmarksScreen.tsx
 ┃ ┣ 📂chat
 ┃ ┃ ┗ 📜ChatScreen.tsx
 ┃ ┣ 📂dr
 ┃ ┃ ┣ 📜DRFirstScreen.tsx
 ┃ ┃ ┗ 📜DRSecondScreen.tsx
 ┃ ┗ 📂settings
 ┃ ┃ ┣ 📜SettingsFirstScreen.tsx
 ┃ ┃ ┣ 📜SettingsMainScreen.tsx
 ┃ ┃ ┗ 📜SettingsSceondScreen.tsx
 ┣ 📂states
 ┃ ┣ 📜authSlice.ts
 ┃ ┣ 📜store.ts
 ┃ ┗ 📜userSlice.ts
 ┣ 📂utils
 ┃ ┣ 📜common.ts
 ┃ ┣ 📜imagePicker.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜validate.ts
 ┗ 📂webSocket
 ┃ ┣ 📜websocketActionTypes.ts
 ┃ ┣ 📜websocketActions.ts
 ┃ ┣ 📜websocketHandler.ts
 ┃ ┗ 📜websocketReducer.ts
</code></pre>
<h2 class="code-line" data-line-start=87 data-line-end=88 ><a id=" 2_How_to_build_87"></a>🧱 2. How to build</h2>
<p class="has-line-data" data-line-start="89" data-line-end="90"><strong>React Native 프로젝트</strong>를 빌드하고 실행하려면 환경 설정이 필요합니다.</p>
<p class="has-line-data" data-line-start="91" data-line-end="92">아래 <strong>React Native - Environment Setup</strong>을 완료한 뒤 진행하세요.</p>
<h3 class="code-line" data-line-start=93 data-line-end=94 ><a id="Step_1_Metro_Server__93"></a>Step 1: Metro Server 실행하기</h3>
<p class="has-line-data" data-line-start="95" data-line-end="96">React Native는 <strong>Metro</strong>라는 JavaScript 번들러를 사용합니다.</p>
<p class="has-line-data" data-line-start="97" data-line-end="98">먼저 Metro 서버를 실행해야 합니다.</p>
<p class="has-line-data" data-line-start="99" data-line-end="100">터미널에서 프로젝트 루트 디렉터리로 이동한 후 다음 명령어를 실행하세요:</p>
<pre><code class="has-line-data" data-line-start="102" data-line-end="108" class="language-bash"><span class="hljs-comment"># npm 사용 시</span>
npm start

<span class="hljs-comment"># 또는 Yarn 사용 시</span>
yarn start
</code></pre>
<h3 class="code-line" data-line-start=109 data-line-end=110 ><a id="Step_2___109"></a>Step 2: 애플리케이션 실행하기</h3>
<p class="has-line-data" data-line-start="111" data-line-end="112">Metro 번들러를 실행한 상태에서 새로운 터미널을 열고 아래 명령어를 입력하세요.</p>
<pre><code class="has-line-data" data-line-start="114" data-line-end="120" class="language-bash"><span class="hljs-comment"># npm 사용 시</span>
npm run ios

<span class="hljs-comment"># 또는 Yarn 사용 시</span>
yarn ios
</code></pre>
<p class="has-line-data" data-line-start="121" data-line-end="122"><strong>조건</strong>:</p>
<ul>
<li class="has-line-data" data-line-start="123" data-line-end="124">iOS 시뮬레이터가 올바르게 설정되어 있어야 합니다.</li>
<li class="has-line-data" data-line-start="124" data-line-end="126"><strong>Xcode</strong>를 통해 직접 실행할 수도 있습니다.</li>
</ul>
<h2 class="code-line" data-line-start=126 data-line-end=127 ><a id=" 3_How_to_install_126"></a>⛱️ 3. How to install</h2>
<p class="has-line-data" data-line-start="128" data-line-end="129">프로젝트를 설치하려면 다음 명령어를 실행하세요:</p>
<pre><code class="has-line-data" data-line-start="131" data-line-end="137" class="language-bash"><span class="hljs-comment"># 패키지 설치</span>
npm install

<span class="hljs-comment"># 또는</span>
yarn install
</code></pre>
<h3 class="code-line" data-line-start=138 data-line-end=139 ><a id="Learn_More_138"></a>Learn More</h3>
<p class="has-line-data" data-line-start="140" data-line-end="141">React Native에 대해 더 알아보려면 다음 리소스를 참고하세요:</p>
<ul>
<li class="has-line-data" data-line-start="142" data-line-end="143"><a href="https://reactnative.dev/">React Native 공식 웹사이트</a></li>
<li class="has-line-data" data-line-start="143" data-line-end="144">Getting Started</li>
<li class="has-line-data" data-line-start="144" data-line-end="145">React Native 블로그</li>
<li class="has-line-data" data-line-start="145" data-line-end="147"><a href="https://github.com/facebook/react-native">@facebook/react-native GitHub Repository</a></li>
</ul>
<h2 class="code-line" data-line-start=147 data-line-end=148 ><a id=" 4_How_to_test_147"></a>🎮 4. How to test</h2>
<h3 class="code-line" data-line-start=149 data-line-end=150 ><a id="__149"></a><strong>애플리케이션 실행</strong></h3>
<p class="has-line-data" data-line-start="151" data-line-end="152">아래 명령어를 사용해 iOS 시뮬레이터에서 애플리케이션을 테스트할 수 있습니다:</p>
<pre><code class="has-line-data" data-line-start="154" data-line-end="156" class="language-bash">npm run ios
</code></pre>
<h3 class="code-line" data-line-start=157 data-line-end=158 ><a id="__157"></a><strong>테스트 계정</strong></h3>
<p class="has-line-data" data-line-start="159" data-line-end="160">테스트 시 사용할 계정 정보는 다음과 같습니다:</p>
<ul>
<li class="has-line-data" data-line-start="161" data-line-end="162"><strong>ID</strong>: <code>john@gmail.com</code></li>
<li class="has-line-data" data-line-start="162" data-line-end="164"><strong>PW</strong>: <code>password1!</code></li>
</ul>
<h3 class="code-line" data-line-start=164 data-line-end=165 ><a id="___164"></a>테스트 입력 예시</h3>
<ul>
<li class="has-line-data" data-line-start="166" data-line-end="167">메뉴 추천 기능 : I want to eat something spicy.</li>
<li class="has-line-data" data-line-start="167" data-line-end="168">메뉴판 설명 기능:</li>
<img width="694" alt="image (1)" src="https://github.com/user-attachments/assets/f5289853-9564-49d3-978f-96f605711158" />


<li class="has-line-data" data-line-start="168" data-line-end="169">반찬 설명 기능:</li>
<img width="535" alt="된장찌개" src="https://github.com/user-attachments/assets/86241f02-d132-4617-87fe-1b99c80602b6" />

</ul>
