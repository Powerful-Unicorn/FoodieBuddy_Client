<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="1_Source_code___0"></a>1. Source code에 대한 설명</h2>
<p class="has-line-data" data-line-start="2" data-line-end="3">이 프로젝트는 <strong>React Native</strong>를 기반으로 한 모바일 애플리케이션입니다.</p>
<p class="has-line-data" data-line-start="4" data-line-end="5">프로젝트는 <code>@react-native-community/cli</code>를 사용해 부트스트랩 되었으며, <strong>TypeScript</strong>를 포함한 현대적인 모바일 개발 환경을 제공합니다.</p>
<p class="has-line-data" data-line-start="6" data-line-end="7">주요 폴더 구조는 다음과 같습니다:</p>
<ol>
<li class="has-line-data" data-line-start="8" data-line-end="10"><strong>apis</strong>
<ul>
<li class="has-line-data" data-line-start="9" data-line-end="10">API 호출 및 관련 로직 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="10" data-line-end="12"><strong>assets</strong>
<ul>
<li class="has-line-data" data-line-start="11" data-line-end="12">이미지, 폰트 등 정적 자산 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="12" data-line-end="14"><strong>components</strong>
<ul>
<li class="has-line-data" data-line-start="13" data-line-end="14">재사용 가능한 UI 컴포넌트 모음</li>
</ul>
</li>
<li class="has-line-data" data-line-start="14" data-line-end="16"><strong>constants</strong>
<ul>
<li class="has-line-data" data-line-start="15" data-line-end="16">프로젝트 전반에서 사용되는 상수 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="16" data-line-end="18"><strong>hooks</strong>
<ul>
<li class="has-line-data" data-line-start="17" data-line-end="18">커스텀 훅 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="18" data-line-end="20"><strong>navigations</strong>
<ul>
<li class="has-line-data" data-line-start="19" data-line-end="20">앱의 네비게이션 설정 및 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="20" data-line-end="22"><strong>screens</strong>
<ul>
<li class="has-line-data" data-line-start="21" data-line-end="22">화면 단위의 컴포넌트 모음</li>
</ul>
</li>
<li class="has-line-data" data-line-start="22" data-line-end="24"><strong>states</strong>
<ul>
<li class="has-line-data" data-line-start="23" data-line-end="24">Redux 상태 관리 관련 파일</li>
</ul>
</li>
<li class="has-line-data" data-line-start="24" data-line-end="26"><strong>utils</strong>
<ul>
<li class="has-line-data" data-line-start="25" data-line-end="26">유틸리티 함수 및 공통 로직 관리</li>
</ul>
</li>
<li class="has-line-data" data-line-start="26" data-line-end="29"><strong>webSocket</strong>
<ul>
<li class="has-line-data" data-line-start="27" data-line-end="29">웹소켓 관련 로직 및 상태 관리</li>
</ul>
</li>
</ol>
<p class="has-line-data" data-line-start="29" data-line-end="30">전체 폴더 구조는 다음과 같습니다.</p>
<pre><code class="has-line-data" data-line-start="32" data-line-end="94">📦src
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
<h2 class="code-line" data-line-start=95 data-line-end=96 ><a id="2_How_to_build_95"></a>2. How to build</h2>
<p class="has-line-data" data-line-start="97" data-line-end="98"><strong>React Native 프로젝트</strong>를 빌드하고 실행하려면 환경 설정이 필요합니다.</p>
<p class="has-line-data" data-line-start="99" data-line-end="100">아래 <strong>React Native - Environment Setup</strong>을 완료한 뒤 진행하세요.</p>
<h3 class="code-line" data-line-start=101 data-line-end=102 ><a id="Step_1_Metro_Server__101"></a>Step 1: Metro Server 실행하기</h3>
<p class="has-line-data" data-line-start="103" data-line-end="104">React Native는 <strong>Metro</strong>라는 JavaScript 번들러를 사용합니다.</p>
<p class="has-line-data" data-line-start="105" data-line-end="106">먼저 Metro 서버를 실행해야 합니다.</p>
<p class="has-line-data" data-line-start="107" data-line-end="108">터미널에서 프로젝트 루트 디렉터리로 이동한 후 다음 명령어를 실행하세요:</p>
<pre><code class="has-line-data" data-line-start="110" data-line-end="117" class="language-bash"><span class="hljs-comment"># npm 사용 시</span>
npm start

<span class="hljs-comment"># 또는 Yarn 사용 시</span>
yarn start

</code></pre>
<h3 class="code-line" data-line-start=118 data-line-end=119 ><a id="Step_2___118"></a>Step 2: 애플리케이션 실행하기</h3>
<p class="has-line-data" data-line-start="120" data-line-end="121">Metro 번들러를 실행한 상태에서 새로운 터미널을 열고 아래 명령어를 입력하세요.</p>
<h3 class="code-line" data-line-start=122 data-line-end=123 ><a id="iOS__122"></a>iOS에서 실행하기</h3>
<pre><code class="has-line-data" data-line-start="125" data-line-end="132" class="language-bash"><span class="hljs-comment"># npm 사용 시</span>
npm run ios

<span class="hljs-comment"># 또는 Yarn 사용 시</span>
yarn ios

</code></pre>
<p class="has-line-data" data-line-start="133" data-line-end="134"><strong>조건</strong>:</p>
<ul>
<li class="has-line-data" data-line-start="135" data-line-end="136">iOS 시뮬레이터가 올바르게 설정되어 있어야 합니다.</li>
<li class="has-line-data" data-line-start="136" data-line-end="138"><strong>Xcode</strong>를 통해 직접 실행할 수도 있습니다.</li>
</ul>
<h2 class="code-line" data-line-start=138 data-line-end=139 ><a id="3_How_to_install_138"></a>3. How to install</h2>
<p class="has-line-data" data-line-start="140" data-line-end="141">프로젝트를 설치하려면 다음 명령어를 실행하세요:</p>
<pre><code class="has-line-data" data-line-start="143" data-line-end="149" class="language-bash"><span class="hljs-comment"># 패키지 설치</span>
npm install

<span class="hljs-comment"># 또는</span>
yarn install
</code></pre>
<hr>
<h2 class="code-line" data-line-start=152 data-line-end=153 ><a id="4_How_to_test_152"></a>4. How to test</h2>
<h3 class="code-line" data-line-start=154 data-line-end=155 ><a id="__154"></a><strong>애플리케이션 실행</strong></h3>
<p class="has-line-data" data-line-start="156" data-line-end="157">아래 명령어를 사용해 iOS 시뮬레이터에서 애플리케이션을 테스트할 수 있습니다:</p>
<pre><code class="has-line-data" data-line-start="159" data-line-end="163" class="language-bash">
npm run ios

</code></pre>
<h3 class="code-line" data-line-start=164 data-line-end=165 ><a id="__164"></a><strong>테스트 계정</strong></h3>
<p class="has-line-data" data-line-start="166" data-line-end="167">테스트 시 사용할 계정 정보는 다음과 같습니다:</p>
<ul>
<li class="has-line-data" data-line-start="168" data-line-end="169"><strong>ID</strong>: <code>john@gmail.com</code></li>
<li class="has-line-data" data-line-start="169" data-line-end="171"><strong>PW</strong>: <code>password1!</code></li>
</ul>
<h2 class="code-line" data-line-start=171 data-line-end=172 ><a id="Learn_More_171"></a>Learn More</h2>
<p class="has-line-data" data-line-start="173" data-line-end="174">React Native에 대해 더 알아보려면 다음 리소스를 참고하세요:</p>
<ul>
<li class="has-line-data" data-line-start="175" data-line-end="176"><a href="https://reactnative.dev/">React Native 공식 웹사이트</a></li>
<li class="has-line-data" data-line-start="176" data-line-end="177">Getting Started</li>
<li class="has-line-data" data-line-start="177" data-line-end="178">React Native 블로그</li>
<li class="has-line-data" data-line-start="178" data-line-end="179"><a href="https://github.com/facebook/react-native">@facebook/react-native GitHub Repository</a></li>
</ul>
