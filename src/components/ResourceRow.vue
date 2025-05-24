<template>
  <tr>
    <td>
      <RouterLink to="/resource/:resourceId">{{ resource.resourceId }}</RouterLink>
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
      <RouterLink to="/resource/:resourceId/input"><button>추가</button></RouterLink>
    </td>
    <td v-else><button>조회</button></td>
  </tr>
</template>

<script setup>
import axios from 'axios';
import { ref , defineEmits} from 'vue';


// 자식 만의 이벤트를 만든다.
const emit = defineEmits(['updateResourceName' , 'updatePlace']);


const props = defineProps(['resource']);

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

</style>