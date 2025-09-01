# Performance report

CO2

## Performance Profiling

Initial profiling was performed using **React DevTools Profiler**.

- **Tested interactions:**
  - Sorting a column
  - Searching for a country
  - Selecting a year
  - Adding/removing columns

## Before/After

<table>
  <tr>
    <th>Before</th>
    <th>After</th>
  </tr>
  <tr>
    <td style="vertical-align: baseline;">
      
### - Sorting a column:

- **Commit Duration: 4.4s**
- **Render Duration: 162.9ms**
<img width="276" height="266" alt="image" src="https://github.com/user-attachments/assets/1582af99-7a7f-4c62-8c21-0ba41f032df4" />

### - Screenshots:

#### Flame Graph for sorting
<img width="590" height="132" alt="image" src="https://github.com/user-attachments/assets/37245980-6280-4a64-bcff-00a75e1ed834" />

#### Ranked Chart for sorting
<img width="587" height="128" alt="image" src="https://github.com/user-attachments/assets/c8a88403-3b47-4a01-b652-3f361aef898d" />

### - Searching for a country:

- **Commit Duration: 6.1s**
- **Render Duration: 192.1ms**

<img width="264" height="260" alt="image" src="https://github.com/user-attachments/assets/2f25b340-53ec-48ce-8f3f-5dcc6bfdd675" />

### - Screenshots:

#### Flame Graph for search

<img width="595" height="112" alt="image" src="https://github.com/user-attachments/assets/95046e3c-3889-4e6b-a599-213c7c5bce00" />

#### Ranked Chart for search

<img width="589" height="138" alt="image" src="https://github.com/user-attachments/assets/e6c2ccb4-d2a8-4b48-8fae-6206b43f13df" />

### - Selecting a year:

- **Commit Duration: 7.7s**
- **Render Duration: 191.7ms**

<img width="261" height="259" alt="image" src="https://github.com/user-attachments/assets/f9bcd5ce-b324-4d77-a110-5124acd34c81" />

### - Screenshots:

#### Flame Graph for year

<img width="596" height="114" alt="image" src="https://github.com/user-attachments/assets/db84afa1-2631-4ee3-afad-d67fb32b1d5a" />

#### Ranked Chart for year

<img width="587" height="117" alt="image" src="https://github.com/user-attachments/assets/b858e3b6-9f2d-406d-b6fa-5a5e44fdb2c7" />

### - Adding/removing columns:

- **Commit Duration: 6.2s**
- **Render Duration: 204.1ms**

<img width="244" height="255" alt="image" src="https://github.com/user-attachments/assets/6c82c52e-89f4-4268-9710-fdced79621e0" />

### - Screenshots:

#### Flame Graph for columns

<img width="585" height="103" alt="image" src="https://github.com/user-attachments/assets/6a3b1cf7-8640-46aa-ab67-eddeecd0b5ec" />

#### Ranked Chart for columns

<img width="585" height="144" alt="image" src="https://github.com/user-attachments/assets/c9a5d3d0-1b03-43a7-9e42-875a59e22e46" />

</td>
<td style="vertical-align: baseline;">  

### - Sorting a column:

- **Commit Duration: 8s**
- **Render Duration: 115.5ms**

<img width="249" height="261" alt="image" src="https://github.com/user-attachments/assets/145147d8-eb41-4b59-82b1-4350b63efdaa" />

### - Screenshots:

#### Flame Graph for sorting
<img width="583" height="105" alt="image" src="https://github.com/user-attachments/assets/e0ebf25d-8509-4224-8f7d-abc6fb957fc2" />


#### Ranked Chart for sorting
<img width="586" height="73" alt="image" src="https://github.com/user-attachments/assets/26aff609-74f9-40f7-b724-4c5db7a501d7" />

  
### - Searching for a country:

- **Commit Duration: 7.1s**
- **Render Duration: 153.6ms**

<img width="260" height="258" alt="image" src="https://github.com/user-attachments/assets/89ef330e-efb4-4460-8d49-96227396a420" />

### - Screenshots:

#### Flame Graph for search

<img width="592" height="107" alt="image" src="https://github.com/user-attachments/assets/71bcf3b8-f8d2-48dc-ac59-042d6065e663" />

#### Ranked Chart for search

<img width="580" height="75" alt="image" src="https://github.com/user-attachments/assets/d016a7c4-6350-4cdb-b946-70deafb11278" />

### - Selecting a year:

- **Commit Duration: 6.5s**
- **Render Duration: 149.3ms**

<img width="213" height="250" alt="image" src="https://github.com/user-attachments/assets/7ea44a3d-0b93-4e1c-af46-5e4b1bb852f7" />

### - Screenshots:

#### Flame Graph for year

<img width="587" height="100" alt="image" src="https://github.com/user-attachments/assets/799dfd32-088a-4149-be94-17a8ac0149a8" />

#### Ranked Chart for year

<img width="586" height="82" alt="image" src="https://github.com/user-attachments/assets/68c4ced6-f39c-4789-8c22-c85fae72922c" />

### - Adding/removing columns:

- **Commit Duration: 7.5s**
- **Render Duration: 115.2ms**

<img width="243" height="252" alt="image" src="https://github.com/user-attachments/assets/3c6d15aa-1d2c-494f-95bd-baa855eef7b2" />

### - Screenshots:

#### Flame Graph for columns

<img width="582" height="100" alt="image" src="https://github.com/user-attachments/assets/7c76c5a4-6e90-48f4-8a5c-db667b5fcae6" />

#### Ranked Chart for columns

<img width="580" height="75" alt="image" src="https://github.com/user-attachments/assets/da91a4fc-d7bc-440a-846e-168961f28020" />

   </td>
  </tr>
</table>
