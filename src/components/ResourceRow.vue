<template>
  <tr>
    <td>
      <RouterLink :to="`/resource/${resource.resourceId}`">{{ resource.resourceId }}</RouterLink>
    </td>
    <td >
      <input v-if="isNameEditing" type="text" @keydown.enter="onPutRequestEnter('resourceName')" @blur="onNameInputBlur" :value="resourceName" @input="onNameInput">
      <span v-else @click="onNameClick">
        {{ resource.resourceName }}
      </span>
    </td>
    <td>
      <input v-if="isPlaceEditing" type="text" @keydown.enter="onPutRequestEnter('place')" @blur="onPlaceInputBlur" :value="place" @input="onPlaceInput">
      <span v-else @click="onPlaceClick">
        {{ resource.place }}
      </span>
    </td>
    <td>{{ resource.resourceUsage.usageStatus }}</td>
    <td>{{ resource.resourceUsage.resourceUserName }}</td>
    <td>{{ resource.resourceUsage.resourceUserPhone }}</td>
    <td>{{ resource.resourceUsage.usageSt }}</td>
    <td>{{ resource.resourceUsage.usageEd }}</td>
    <td v-if="resource.resourceUsage.usageStatus == ''">
      <RouterLink :to="`/resource/${resource.resourceId}/input`"><button class="add-btn">추가</button></RouterLink>
    </td>
    <td v-else>
      <RouterLink :to="`/resource/${resource.resourceId}`"><button class="read-btn">조회</button></RouterLink>
    </td>
  </tr>
</template>

<script setup>
import axios from 'axios';
import { ref , defineEmits, defineProps } from 'vue';


// 자식 만의 이벤트를 만든다.
const emit = defineEmits(['updateResourceName' , 'updatePlace']);


const props = defineProps({resource:Object});

const isNameEditing = ref(false);
const isPlaceEditing = ref(false);

const resourceName = ref(props.resource.resourceName);
const place = ref(props.resource.place);


function onNameClick (){
  isNameEditing.value = true;
}
function onPlaceClick (){
  isPlaceEditing.value = true;
}

function onNameInputBlur(){
  resourceName.value = props.resource.resourceName;
  isNameEditing.value = false;
}

function onPlaceInputBlur(){
  place.value = props.resource.place;
  isPlaceEditing.value = false;
}

function onNameInput(e){
  resourceName.value = e.target.value;
}
function onPlaceInput(e){
  place.value = e.target.value;
}



async function onPutRequestEnter(target){
  //resourceName을 spring boot로 날리기

  try{
    const res = await axios.put(`http://localhost:8003/api/resource/${props.resource.resourceId}`, {
      resourceName : resourceName.value,
      place :place.value
    });
  
    if(res.data == '성공'){
      //input 태그를 없애야함
      // 부모한테 변경된 resourceName값을 전달해야함
      // emit 함수
      if(target == 'resourceName'){
        emit('updateResourceName' , resourceName.value);
        isNameEditing.value = false;
      }else if(target == 'place'){
        emit('updatePlace' , place.value);
        isPlaceEditing.value = false;
      }
    }

  }catch(e){
    console.log(e);
    if(target == 'resourceName'){
      alert('resource name 변경 중 오류 발생');
      resourceName.value = props.resource.resourceName;
      isNameEditing.value = false;
    }else if(target == 'place'){
      place.value = props.resource.place;
      isPlaceEditing.value = false;
    }
  }
  

}

</script>

<style scoped>
body {
  padding: 1.5em;
  background: #f5f5f5
}

table {
  border: 1px #a39485 solid;
  font-size: .9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #73685d;
}

td,
th {
  padding: 1em .5em;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background: #fff;
}

a {
  color: #73685d;
}

@media all and (max-width: 768px) {

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }


}
/* 공통 버튼 스타일 */
.add-btn,
.read-btn {
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* add-btn: 진한 회색 계열로 살짝 강조 */
.add-btn {
  background-color: #b0bec5; /* 연한 회색-블루톤 */
  color: #263238; /* 진한 회색 글씨 */
  border-color: #90a4ae;
}

.add-btn:hover {
  background-color: #90a4ae;
}

/* read-btn: 더 미니멀하고 은은한 회색 계열 */
.read-btn {
  background-color: #e0e0e0;
  color: #424242;
  border-color: #bdbdbd;
}

.read-btn:hover {
  background-color: #d5d5d5;
}
/* 수정용 input 칸 공통 스타일 */
input[type="text"] {
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 95%;
  box-sizing: border-box;
}

input[type="text"]:focus {
  border-color: #90a4ae;
  box-shadow: 0 0 3px rgba(144, 164, 174, 0.5);
  outline: none;
}


</style>