<template>
  <!--header-->
  <main>
    <h1>자원: </h1>
    <h3>관리 테이블</h3>
    <table>
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Name</th>
          <th>Place</th>
          <th>Status</th>
          <th>User Name</th>
          <th>User Phone</th>
          <th>Start</th>
          <th>End</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <ResourceRow  v-for="resource in resourceList" 
        @update-resource-name="newResourceName=> onUpdateResourceName(newResourceName, resource.resourceId) "
        @update-place="newPlace => onUpdatePlace(newPlace , resource.resourceId)"
        :key="resource.resourceId" :resource="resource"/>
        
        <tr v-if="addMode">
          <td></td>
          <td>
            <input @keyup.enter="saveResource" @input="onResourceName" :value="name" placeholder="예시: 사물함1" type="text">
          </td>
          <td>
            <input @keyup.enter="saveResource" @input="onPlaceName" :value="place"
              placeholder="위치한 장소 입력 (예: 본관, 동원관 등)" type="text">
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><button @click="saveResource">추가</button></td>
        </tr>
      </tbody>
    </table>
    <button @click="addMode = true">+</button>
  </main>
  <!--footer-->
</template>

<script setup>
import ResourceRow from "@/components/ResourceRow.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const addMode = ref(false);
const name = ref('');
const place = ref('');
const route = useRoute();
const resourceList = ref([]);

function onResourceName(e) {
  name.value = e.target.value;
}
function onPlaceName(e) {
  place.value = e.target.value;
}

function validateName() {
  if (name.value == '') {
    return false;
  }
  return true;
}
function validatePlace() {
  if (place.value == '') {
    return false;
  }
  return true;
}

function saveResource() {
  const isNameValidate = validateName();
  const isPlaceValidate = validatePlace();

  if (isNameValidate && isPlaceValidate) {
    createResource();
  } else {
    alert('빈칸이 있으면 안 됩니다.');
  }
}
async function loadResourceList() {
  try {
    const res = await axios.get(`http://localhost:8003/api/resource/${route.params.workplaceId}`);
    resourceList.value = res.data.map(resource => {
      if (resource.resourceUsage == null) {
        resource.resourceUsage = {
          usageStatus: '',
          resourceUserName: '',
          resourceUserPhone: '',
          usageSt: '',
          usageEd: ''
        };
      }
      resource.editingField = null;
      resource.tempName = '';
      resource.tempPlace = '';
      return resource;
    });
  } catch (err) {
    alert('오류 발생!');
  }
}

async function createResource() {
  try {
    const res = await axios.post(`http://localhost:8003/api/resource/${route.params.workplaceId}`, {
      resourceName: name.value,
      place: place.value
    }
    )
    if (res.data != '성공') {
      alert('자원 추가 실패');
    } else {
      await loadResourceList();
      name.value = '';
      place.value = '';
      addMode.value = false;
    }
  } catch (err) {
    alert('오류발생');
  }
}


function onUpdateResourceName(newResourceName , resourceId){
  console.log(newResourceName, resourceId);

  const resource = resourceList.value.find(e => e.resourceId == resourceId);
  if(resource){
    resource.resourceName = newResourceName;
  }
}

function onUpdatePlace(newPlace , resourceId){
  const resource = resourceList.value.find(e => e.resourceId == resourceId);
  if(resource){
    resource.place = newPlace;
  }
}


// function cancelEdit(resource) {
//   resource.editingField = null;
// }

// async function submitEdit(resource) {
//   const confirmed = confirm('정말 수정하시겠습니까?');
//   if (!confirmed) {
//     cancelEdit(resource);
//     return;
//   }

//   try {
//     const res = await axios.put(`http://localhost:8003/api/resource/${route.params.workplaceId}`,
//       {
//         resourceName: resource.tempName,
//         place: resource.tempPlace
//       }
//     )
//     if (res.data == "성공") {
//       resource.resourceName = resource.tempName,
//         resource.place = resource.tempPlace;
//     } else {
//       alert('수정 실패');
//     }
//   } catch (err) {
//     alert('오류 발생');
//   }
// }

onMounted(() => {
  loadResourceList();
})
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
</style>