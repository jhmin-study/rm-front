<template>
<!--header-->
<main>
  <h1>자원: </h1>
  <h3>관리 테이블</h3>
  <table>
  <thead>
  <tr>
      <th><RouterLink>Resource ID</RouterLink></th>
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
  <tr>
      <td>1</td>
      <td>별관</td>
      <td>사용중</td>
      <td>홍길동</td>
      <td>(713) 123-8965</td>
      <td>01/13/1979</td>
      <td>01/13/1979</td>
      <td><button>조회</button></td>
  </tr>
  </tbody>
  </table>
</main>
<!--footer-->
</template>

<script setup>

</script>


<style scoped>
body {
padding:1.5em;
background: #f5f5f5
}

table {
border: 1px #a39485 solid;
font-size: .9em;
box-shadow: 0 2px 5px rgba(0,0,0,.25);
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

td, th {
padding: 1em .5em;
vertical-align: middle;
}

td {
border-bottom: 1px solid rgba(0,0,0,.1);
background: #fff;
}

a {
color: #73685d;
}

@media all and (max-width: 768px) {

table, thead, tbody, th, td, tr {
display: block;
}

th {
text-align: right;
}

table {
position: relative; 
padding-bottom: 0;
border: none;
box-shadow: 0 0 10px rgba(0,0,0,.2);
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