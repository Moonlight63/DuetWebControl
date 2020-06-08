
<template>
    <div class="component d-flex flex-column flex-grow-1" style="min-height: 0">
        <div class="justify-center align-content-center" 
        style="display: grid; width: 100%; height: 100%; grid-gap: 1rem;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-template-rows: repeat(8, minmax(0, 1fr));">
            <slot/>
        </div>
    </div>
</template>