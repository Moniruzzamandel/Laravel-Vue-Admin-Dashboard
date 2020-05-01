<template>
    <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Categories Table</h3>

                <div class="card-tools">
                    <button @click="addCategoryModal" class="btn btn-outline-success btn-md">ADD CATEGORY</button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>


                    <tr v-for="category in categories.data" :key="category.id">
                      <td>{{category.id}}</td>
                      <td>{{category.name | upText}}</td>
                      <td>
        <!-- Conditionaly Show Button Based On status -->
        <button v-if="category.status==0" @click="updateCategoryStatus(category.id)" type="submit" class="btn btn-outline-danger btn-sm">{{ category.status ? 'PUBLISHED' : 'UNPUBLISHED' }}</button>
        <button v-else @click="updateCategoryStatus(category.id)" type="submit" class="btn btn-outline-success btn-sm">{{ category.status ? 'PUBLISHED' : 'UNPUBLISHED' }}</button>
                      </td>
                      <td>
                          <a href="#" @click="editCategoryModal(category)" class="btn btn-outline-info btn-sm">Edit</a>
                          <a href="#" @click="deleteCategory(category.id)" class="btn btn-outline-danger btn-sm">Delete</a>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                  <pagination :data="categories" @pagination-change-page="getResults"></pagination>
              </div>
              <!-- Card Footer -->
            </div>
            <!-- /.card -->


          </div>
        </div>


        <!-- Categorys Modal -->
        <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addCategoryModalLabel">ADD NEW CATEGORY</h5>
                    <h5 class="modal-title" v-show="editMode" id="addCategoryModalLabel">UPDATE CATEGORY</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateCategory() : createCategory()">
                    <div class="modal-body">

                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" placeholder="Enter Your Category"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">CLOSE</button>
                        <button v-show="editMode" type="submit" class="btn btn-primary">UPDATE CATEGORY</button>
                        <button v-show="!editMode" type="submit" class="btn btn-primary">CREATE CATEGORY</button>
                    </div>
                </form>
            </div>
        </div>
        </div>



    </div>
</template>

<script>
    import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.min.js';
    export default {
        components: {
            'bootstrap-table': BootstrapTable
        },
        data(){
            return{
                editMode : false,
                updateStatus : false,
                categories : {},
                form: new Form({
                    id: '',
                    name: ''
                }),
            }
        },

        methods: {
            getResults(page = 1) {
			    axios.get('api/category?page=' + page)
				.then(response => {
					this.categories = response.data;
				});
		    },
            editCategoryModal(category){
                this.editMode = true,
                this.form.reset();
                $('#addCategoryModal').modal('show');
                this.form.fill(category);
            },
            addCategoryModal(){
                this.editMode = false,
                this.form.reset();
                $('#addCategoryModal').modal('show');
            },
            deleteCategory(id){
                swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            this.form.delete('api/category/'+id).then(()=>{
                                swal.fire(
                                    'Deleted!',
                                    'Category has been deleted.',
                                    'success'
                                )
                            Fire.$emit('AfterCreate');
                            }).catch(()=>{
                                swal("Failed!", "There was something wrong.", "warning");
                            });
                        }
                    })
            },
            loadCategories(){
                if(this.$gate.isAdminOrAuthor()){
                    axios.get("api/category").then(({ data })=>(this.categories = data));
                }
            },
            createCategory() {
                this.$Progress.start();
                this.form.post('api/category').then(() => {
                    Fire.$emit('AfterCreate');
                });
                $('#addCategoryModal').modal('hide');

                toast.fire({
                    icon: 'success',
                    title: 'Category Created successfully'
                });
                this.$Progress.finish();
            },

            updateCategory(){
                this.$Progress.start();
                this.form.put('api/category/'+this.form.id)
                .then(() => {
                    swal.fire(
                            'Updated!',
                            'Category has been updated.',
                            'success'
                        )
                    Fire.$emit('AfterCreate');
                    $('#addCategoryModal').modal('hide');
                    this.$Progress.finish();
                }).catch(()=>{
                    this.$Progress.fail();
                });
            },
            updateCategoryStatus(id){
                this.$Progress.start();
                this.form.put('api/category/status/'+id)
                .then(() => {
                    swal.fire(
                            'Updated!',
                            'Category Status has been updated.',
                            'success'
                        )
                    Fire.$emit('AfterCreate');
                    this.$Progress.finish();
                }).catch(()=>{
                    this.$Progress.fail();
                });
            }
        },

        created() {
            this.loadCategories();
            Fire.$on('AfterCreate', () => {
                this.loadCategories();
            });
            // setInterval(() => this.loadUsers(), 2000);
        }
    }
</script>
