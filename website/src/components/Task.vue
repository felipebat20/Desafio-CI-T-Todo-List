<template>
	<div class="col-12 main">
		<div class="col-9 mx-auto">
			<h1 class="mx-5 col-6 col-md-3">
				My TODO List
			</h1>

			<div class="col-6 mx-auto">
				<div class="input-group mb-3">
					<input
						id="add-new-task-input"
						v-model="new_task"
						class="form-control"
						placeholder="Digite o nome da tarefa"
						type="text"
						@keyup.enter="addNewTask"
					/>

					<button
						id="btn-add-new-task"
						class="btn btn-outline-secondary"
						type="button"
						@click="addNewTask"
					>
						Adicionar
					</button>
				</div>
			</div>
		</div>

		<div class="col-9 mx-auto">
			<table class="table">
				<thead>
					<th scope="col" width="10%" />

					<th
						scope="col"
						width="40%"
					>
						Tarefa
					</th>

					<th scope="col" width="50%">Ações</th>
				</thead>
				<tbody>
					<tr v-for="(task, index) in tasks" :key="index">
						<td>
							<template v-if="!task.completed">
								<input
									v-model="selected_task"
									:id="`input-select-task-${task.id}`"
									type="checkbox"
									:value="task.id"
									:checked="isChecked(task)"
									:disabled="isChecked(task)"
								/>
							</template>

							<input
								v-else
								type="checkbox"
								:value="task.id"
								:checked="isChecked(task)"
								:disabled="isChecked(task)"
							/>
						</td>

						<td>
							<span :class="getCompletedTask(task)">
								{{ task.name }}
							</span>
						</td>

						<td>
							<div class="row">
								<div class="col-4">
									<button
										class="btn btn-primary btn-sm btn-block"
										@click="editTask(task)"
									>
										<i class="far fa-edit" />
										<span class="px-3 text">
											Editar
										</span>
									</button>
								</div>

								<div class="col-4">
									<button
										:id="`btn-delete-${index}`"
										class="btn btn-danger btn-sm btn-block"
										@click="removeTask(task)"
									>
										<i class="far fa-trash-alt" />

										<span
											class="px-3 text"

										>
											Excluir
										</span>
									</button>
								</div>

								<div class="col-4">
									<button
										:id="`btn-finish-${index}`"
										class="btn btn-secondary btn-sm btn-block"
										@click="finishTask(task)"
									>
										<i class="far fa-check-circle" />

										<span
											class="px-3 text"
										>
											Finalizar
										</span>
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-9 row mx-auto">
			<div class="col-3">
				<button
					id="btn-select-all-tasks"
					class="btn btn-secondary btn-sm btn-block"
					@click="selectAll"
				>
					<i class="far fa-check-double" />

					<span class="px-3 text"> Selecionar todas </span>
				</button>
			</div>

			<div class="col-3">
				<button
					id="btn-finish-all-selected-tasks"
					class="btn btn-secondary btn-sm btn-block"
					@click="finishSelected"
				>
					<i class="far fa-check-circle" />

					<span class="px-3 text">
						Finalizar selecionadas
					</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		fetchTasks,
	} from '../api';

	export default {
		name: "Tasks",
		data() {
			return {
				new_task: "",
				completed_tasks: [],
				selected_task: [],
				tasks: [],
			};
		},

		computed: {
			getUncompletedTasks() {
				const uncompleted_tasks = [];
				this.tasks.forEach((task) => {
					if (!task.completed) {
						uncompleted_tasks.push(task);
					}
				});

				return uncompleted_tasks;
			}
		},

		async mounted() {
			await this.$nextTick(() => {
				this.fetchTasks();
			});
			this.getChecked();
		},

		methods: {
			async fetchTasks() {
				this.tasks = await fetchTasks();
			},


			isChecked(task) {
				const { completed } = task;

				return !!completed;
			},

			getChecked() {
				this.tasks.forEach((task) => {
					task.completed ? this.completed_tasks.push(task.id) : "";
				});
			},

			getCompletedTask(task) {
				const { completed = false } = task;

				if (completed) {
					return "text-muted text-decoration-line-through";
				}
			},

			addNewTask() {
				if (this.new_task.trim().length > 3) {
					this.tasks.push({
						name: this.new_task,
						id: Math.floor(Math.random() * 100),
						completed: false,
					});

					return this.new_task = '';
				}
			},

			removeTask(task) {
				const { id: task_id } = task;

				this.tasks.forEach((element, index) => {
					if (task_id === element.id) {
						this.tasks.splice(index, 1);
					}
				});
			},

			finishTask(task) {
				const { id: task_id } = task;

				this.tasks.forEach((element, index) => {
					if (task_id === element.id) {
						this.completed_tasks.push(task_id);
						this.tasks[index].completed = true;
					}
				});
			},

			editTask() {},

			selectAll() {
				this.selected_task = [];

				this.tasks.forEach((task) => {
					if (!task.completed) {
						this.selected_task.push(task.id);
					}
				});
			},

			finishSelected() {
				this.tasks.forEach((task, index) => {
					const { id } = task;
					if (this.selected_task.includes(id)) {
						this.tasks[index].completed = true;
						this.completed_tasks.push(id);
					}
				});
			}
		},
	};
</script>

<style scoped>
	.main {
		height: 100vh;
		width: 100%;
	}

	h3 {
		margin: 40px 0 0;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
