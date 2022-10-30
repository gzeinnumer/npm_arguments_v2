<?php

/**
* Generated By GZeinNumerCodeGenerator
* www.github.com/gzeinnumer
* at 2022-10-28 09:02:08
* zip name 20221028090208_examples_v5_QPAq16AVFz.zip
*/

use App\Http\Controllers\API\ExamplesV5Controller;

Route::prefix('examplesv5')->group(function () {
    Route::post('/insert', [ExamplesV5Controller::class, 'insert'])->name('examplesv5.insert');
    Route::get('/all', [ExamplesV5Controller::class, 'all'])->name('examplesv5.all');
    Route::get('/paging', [ExamplesV5Controller::class, 'paging'])->name('examplesv5.paging');
    Route::post('/update/{id}', [ExamplesV5Controller::class, 'update'])->name('examplesv5.update');
    Route::get('/find/{id}', [ExamplesV5Controller::class, 'find'])->name('examplesv5.find');
    Route::get('/delete/{id}', [ExamplesV5Controller::class, 'delete'])->name('examplesv5.delete');
});