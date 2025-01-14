<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subscriber;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class EmailList extends Model
{
    /** @use HasFactory<\Database\Factories\EmailList> */
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'listFile',
        'user_id',
    ];

    /**
     * Create a new email list.
     */
    public static function createList(array $data, $userId)
    {
        $data['user_id'] = $userId;

        $items = self::readEmailsFromCsvFile($data);
    
        return DB::transaction(function () use ($data, $items) {
            $emailList = self::create([
                'title'   => $data['title'],
                'user_id' => $data['user_id'],
            ]);
    
            foreach ($items as $item) {
                Subscriber::create([
                    'name'          => $item['name'],
                    'email'         => $item['email'],
                    'email_list_id' => $emailList->id,
                ]);
            }
    
            return $emailList;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subscribers(): HasMany
    {
        return $this->hasMany(Subscriber::class);
    }

    private static function readEmailsFromCsvFile(array $data) {
        $fileHandle = fopen($data['listFile']->getRealPath(), 'r');
    
        $headers = fgetcsv($fileHandle, 1000, ',');
    
        $nameIndex = array_search('name', $headers);
        $emailIndex = array_search('email', $headers);
    
        if ($nameIndex === false || $emailIndex === false) {
            throw new \Exception('CSV must contain "name" and "email" columns.');
        }
    
        $items = [];
    
        while (($row = fgetcsv($fileHandle, 1000, ',')) !== false) {
            $items[] = [
                'name'  => $row[$nameIndex],
                'email' => $row[$emailIndex],
            ];
        }
    
        fclose($fileHandle);
    
        return $items;
    }

    /**
     * Local scope for search by name or id.
     */
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query, $search) {
            $query->where('title', 'like', "%$search%")
                ->orWhere('id', 'like', "%$search%");
        });
    }
}
