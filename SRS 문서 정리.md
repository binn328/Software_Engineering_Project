
1. 회원관리
	1. 회원가입
		1. 신규 회원으로 등록한다. 
			1. 등록 시, 이름, 생년월일, ID, PASSWD를 입력해야한다.
			2. ID는 중복확인을 해야한다.
			3. Passwd는 문자와 숫자를 조합해야 한다.
	2. 회원탈퇴
		1. 현재 로그인된 계정을 탈퇴한다.
			1. 회원탈퇴를 하려면 회원탈퇴를 하려는 ID로 로그인한 상태여야한다.
			2. 탈퇴 시, 본인의 ID와 Passwd를 한 번 더 입력해야한다.
			3. 탈퇴한 회원은 복구할 수 없다.
	3. 비밀번호 변경
		1. 현재 로그인한 계정의 비밀번호를 변경한다.
			1. 비밀번호 변경을 위해서는 로그인한 상태여야 한다.
			2. 변경을 위해서는 기존의 비밀번호를 인증해야 한다.
			3. 인증에 성공하면 새로운 비밀번호를 입력한다.
			4. 비밀번호 양식이 올바르면 변경처리한 후, 로그아웃시킨다.
	4. 로그인
		1. 서비스 이용을 위해 로그인한다.
			1. 로그인 시 ID와 Passwd를 서버에 제출해야한다.
			2. 서버는 ID가 존재하는지 검사하고 존재한다면 Passwd와의 일치 여부도 검사한다.
			3. 둘 중 하나라도 실패하면 로그인 실패를 반환한다.
			4. 로그인 성공 시, 메인 화면으로 이동한다.
	5. 로그아웃
		1. 서비스 이용을 마치고 로그아웃한다.
			1. 로그아웃을 하려면 로그인한 상태여야 한다.
			2. 로그아웃 버튼을 누르면 로그인 창으로 이동한다.
2. 일정관리
	1. 일정 추가
		1. 사용자가 일정을 추가한다.
			1. 일정을 추가하려면 로그인한 상태여야 한다.
			2. 일정은 일정 제목과 추가할 날짜가 필요하다.
			3. 일정 추가 시, 시작일, 마감일을 선택적으로 추가할 수 있다.
			4. 일정 추가 시, 반복 조건을 선택할 수 있다.
				- 반복 조건을 주간으로 선택한 경우, 반복될 요일을 지정하면 된다.
				- 반복 조건을 월간으로 선택한 경우, 반복될 날짜를 지정하면 된다.
					- 월말마다 반복을 원하는 경우, 따로 체크박스를 두어 선택하도록 한다.
				- 반복 조건을 연간으로 선택한 경우, 반복될 월-일 을 지정하면 된다.
					- 역시 말일 옵션이 존재하며, 2월 29일을 선택한 경우, 윤년마다 반복됨을 팝업으로 알려준다.
					- 또 다른 옵션으로 음력을 지정할 수 있다.
				- 반복 조건을 일정 일수로 지정하는 것이 가능하다.
					- ex) 26일마다 반복
			5. 일정 추가 시, 기간이 지나면 일정을 자동으로 삭제할지 여부를 지정할 수 있다.
			6. 일정 추가 시, 중요도를 지정할 수 있다.
			7. 일정 추가 시, 카테고리를 지정할 수 있다.
			8. ex) 직장, 가족, 학교...
			9. 일정 추가 시, 일정 목록에 표시될지를 정할 수 있다.
			10. 표시되지 않게 지정한 경우, 메모처럼 활용할 수 있다.
				1. 활성화된경우 일정 리스트에 잡히지 않는다.
	1. 일정 수정
		1. 사용자가 이미 추가된 일정을 수정한다.
			- 일정을 수정하려면 수정하려는 일정이 이미 존재해야 한다.
			- 일정을 수정하고 확정하면, 일정이 수정된다.
			- 일정의 자동 삭제 여부를 여기서도 다시 지정할 수 있다.
	2. 일정 공유
		1. 사용자가 다른 사용자와 일정을 공유한다.
			- 일정을 공유하려면 공유하려는 일정이 이미 존재해야 한다.
			- 일정을 공유하려면 공유하려는 다른 사용자가 존재해야 한다.
			- 두 사용자는 공유하는 일정 데이터베이스를 가지게 된다.
			- 한 사용자가 수정하면 다른 사용자에게도 수정된 상태로 보여지게 된다.
3. 달력 관리
	1. 일정 관리
		1. 달력에서 일정을 추가하고자 한다면, 현재 선택된 날짜를 기준으로 일정 추가 창이 뜨게 된다.
		2. 달력에는 해당하는 날짜에 일정이 책갈피로 표기된다.
		3. 일정의 중요도에 따라 책갈피의 색상이 달라진다.
		4. 달력에서 날짜를 더블 클릭하면 팝업창으로 자세한 일정을 보여준다.
	2. 꾸미기 
		1. 이모티콘 추가 기능
			1. 달력에 이모티콘으로 그 날의 기분이나 날짜 등을 스티커처럼 표기할 수 있다.
		2. 별점 기능
			1. 별점 기능을 사용할 경우, 이모티콘 ★이 5개까지 표시된다.
		3. 배경색 지정 기능
			1. 특정 날의 배경색을 지정할 수 있다. 
			2. 해당 기능으로 사용자가 그 날의 기분을 나타낸다거나의 동작이 가능해진다.
		4. 기본적으로 토요일의 글자색은 파란색, 일요일은 빨간색이다.
	3. 목표 지정 기능
		1. 달력에 올해 목표, 이번 달 목표를 추가할 수 있다.
		2. 기간이 자동으로 연초 ~ 연말, 월초 ~ 월말로 지정된 일정이 추가된다.
4. 학점 관리
	1. 졸업 요건 추가
		1. 졸업에 필요한 총 학점, 최소 교양학점, 최소 전공학점을 추가할 수 있다.
	2. 학기 추가 기능
		1. 1학년 1학기, 3학년 2학기, 3학년 여름학기처럼 성적을 입력할 학기를 추가할 수 있다.
		2. 학기별 종합(취득 학점, 평균 점수)를 확인할 수 있다.
	3. 성적 추가 기능
		1. 이 기능을 사용하려면 추가할 학기를 지정해야한다.
		2. 추가 시, 과목이름, 구분(교양, 전공), 학점, 성적을 입력해야한다.
	4. 성적 조회 기능
		1. 입력된 성적들을 합산하여 남은 교양 점수, 전공 점수를 보여준다.
		2. 총 남은 학점을 보여준다.
		3. 평균 점수를 보여준다.
5. 일정 리스트
	1. 일정을 리스트로 표시
		1. 현재 존재하는 일정들을 리스트 형식으로 확인할 수 있다.
		2. 모양새는 Todo 리스트와 비슷하다.
		3. 왼쪽에 체크박스가 존재하고 완료 여부를 선택할 수 있다.
		4. 표시될 리스트를 오늘까지 완료해야할 일, 내일까지, 일주일 안에, 한 달 안에, 올해 안에 등을 지정할 수 있다.
	2. 일정을 카테고리별로 표시
		1. 현재 존재하는 일정들을 카테고리별로 분류해 리스트로 나타낸다.
		2. 그 외 기능은 기존 리스트와 동일하다.
6. 시간표
	1. 시간표 추가
		1. 
7. 메인화면 레이아웃 
	1. 시계 기능
		1. 메인화면에 현재 시각을 알려주는 시계가 표시된다.
	2. 명언 표시 기능
		1. 메인화면에 접속할 때마다 달라지는 명언이 출력된다.
	3. 건의, 문의 기능
		1. 메인화면에 개발자측에 문의, 건의할 수 있는 버튼이 존재한다.
		2. 이 버튼을 누르면 개발자의 연락처가 팝업으로 뜬다.
	4. 탭 기능
		1. 사용할 기능들(달력, 리스트, 일정 추가 등...)이 탭으로 표시된다.
		2. 이 탭을 누르면 해당 기능으로 전환된다.
	5. 날씨
		1. 도시 추가
			1. 날씨를 확인할 도시를 지정하는 기능이다.
			2. 기상청 api를 활용하면 되기에 도시들을 데이터베이스로 저장해두고(제공하는 엑셀 파일이 있음), 이를 도시로 변경해 보여주는 것을 구현할 필요가 있다.
		2. 날씨 표시 
			1. 날씨가 아이콘(해, 구름, 비, 눈 등..)으로 표기된다.
			2. 그 날의 기온을 수치로 알려주며, 날씨 아이콘 주변에 간단한 요약을 알려주는 부분이 존재한다.(30도면 더워요, 바람불면 바람이 많이 불어요 등..)
	6. 테마 설정
		1. 다크모드
			1. 웹 페이지 테마를 다크모드로 변경한다.
		2. 화이트모드
			1. 웹 페이지 테마를 화이트모드로 변경한다.
	7. 폰트 변경
		1. 웹 페이지에 표시되는 폰트를 변경할 수 있다.
		2. 사용자는 미리 지정된 폰트들 중에 선택할 수 있다.
	8. 메모 기능
		1. 간단한 메모를 적어둘 수 있는 탭이다.
	9. 가계부 기능
		1. 간단한 가계부를 작성할 수 있는 기능을 제공한다.
		2. 수입, 지출 등을 관리할 수 있는 표를 제공하며, 합계 지출, 소득, 소계같은 항목은 자동으로 완성되어 계산을 일일히 할 필요가 없다.