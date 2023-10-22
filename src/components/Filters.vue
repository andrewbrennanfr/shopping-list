<script setup lang="ts">
defineProps<{
    categories: string[]
    keywords: string
    onChangeKeywords: (event: Event) => void
    onClickClear: (event: Event) => void
    onSelectCategory: (event: Event) => void
    selectedCategories: string[]
}>()
</script>

<template>
    <div class="container mt-2">
        <div class="row">
            <div
                class="col-12 mb-2 mt-4 d-flex justify-content-between align-items-center"
            >
                <h2 class="fw-light">🔍 Search</h2>

                <button
                    v-if="selectedCategories.length || keywords.trim()"
                    class="btn btn-primary"
                    @click="onClickClear"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold" for="categories">
                    Categories
                </label>
                <select
                    @input="onSelectCategory"
                    class="form-select form-select-lg"
                    multiple
                >
                    <option
                        v-for="category in categories"
                        :key="category"
                        :selected="selectedCategories.includes(category)"
                        :value="category"
                    >
                        {{ category }}
                    </option>
                </select>
            </div>

            <div class="col-md-6 mb-3">
                <label for="search" class="form-label fw-bold">Keywords</label>
                <input
                    :value="keywords"
                    @input="onChangeKeywords"
                    class="form-control form-control-lg"
                    placeholder="Recipe or ingredient..."
                    type="text"
                />
            </div>
        </div>
    </div>
</template>
