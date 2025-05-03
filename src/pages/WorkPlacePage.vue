<template>
    <!--헤더-->
    <h1>workspace</h1>
    <main>
        <form class="create-workplace-form">
            <div class="form-group">
                <label for="business-type-nm">사업장 유형</label>
                <input type="text" id="business-type-nm" placeholder="작업장 유형을 입력하세요.(EX:볼링장, 스터디카페)">
            </div>
            <div class="form-group">
                <label for="business-reg-no">사업자 번호</label>
                <input type="text" id="business-reg-no" placeholder="사업자 번호를 입력하세요.">
            </div>
            <div class="form-group">
                <label for="business-name">사업장 명</label>
                <input type="text" id="business-name" placeholder="작업장 이름을 입력하세요.">
            </div>
            <div class="form-group">
                <label for="owner-name">사업자명</label>
                <input type="text" id="owner-name" placeholder="사업자이름을 입력하세요.">
            </div>
            <div class="form-group">
                <label for="phone-number">사업자 전화번호</label>
                <input type="text" id="phone-number" placeholder="사업자전화번호를 입력하세요.">
            </div>
            <div class="form-group">
                <label for="address">사업장 주소</label>
                <input type="text" id="address" placeholder="사업장 주소를 입력하세요.">
            </div>
            <div class="form-group">
                <label for="detail-address">사업장 상세주소</label>
                <input type="text" id="detail-address" placeholder="사업장 상세주소를 입력하세요.">
            </div>
            <div class="form-group">
                <label for="status">사업장 상태</label>
                <select>
                <option disabled value="">다음 중 하나를 선택하세요</option>
                <option value="ACTIVE">활성화</option>
                <option value="INACTIVE">비활성화</option>
                <option value="DELETED">삭제됨</option>
                </select>
            </div>
        <!-- 제출 버튼 -->
        <div class="form-group">
        <button type="submit" class="effect-button">작업장 만들기</button>

      </div>

        </form>

    </main>
    <!--푸터-->
</template>